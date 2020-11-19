/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const currentDate = new Date(Date.now());

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweet) => {
  const createdAt = new Date(tweet.created_at);
  const dateDifference = currentDate.getTime() - createdAt.getTime();
  const differenceInDays = Math.round(dateDifference / (1000 * 3600 * 24));
  let $tweet = $(` 
  <article class = "tweet">
  <header>
    <img src= "${escape(tweet.user.avatars)}" alt="Profile Pic">
    <span class="full-name">${escape(tweet.user.name)}</span>
    <span class="tweet-username">${escape(tweet.user.handle)}</span>
  </header>
  <main>
    ${escape(tweet.content.text)}
  </main>
  <footer>
    ${differenceInDays} Days ago
    <span class="tweet-icons"><i class="fas fa-flag fa-fw"></i>&nbsp;&nbsp;<i
        class="fas fa-retweet"></i>&nbsp;&nbsp;<i class="fas fa-heart"></i></span>
  </footer>
</article>`);

  return $tweet;
};

const renderTweets = (tweets) => {
  tweets = tweets.reverse();
  for (const tweet of tweets) {
    let $data = createTweetElement(tweet);
    $('#tweet-container').append($data);
  }
}

const loadTweets = () => {
  $.getJSON("/tweets", function (tweets) {
    renderTweets(tweets);
  });
}

const addError = (errorHTML) => {
  $('.container').prepend(errorHTML);
  $('.error').hide();
  $('.error').slideDown("fast");
}

const showError = (error) => {
  let errorString = "";
  if (error === "Empty Form") {
    errorString = "We're sure you have more to say than that!";
  } else {
    errorString = "Your Tweet is over 140 characters!";
  }

  const errorHTML = $(`
  <section class = "error">
    <i class="fas fa-exclamation-triangle"></i>${errorString}<i class="fas fa-exclamation-triangle"></i>
  </section>`);

  if ($(".error").length) {
    $(".error").slideUp("fast", function () {
      $('.error').remove();
      addError(errorHTML);
    });
  } else {
    addError(errorHTML);
  }
}

$(document).ready(function () {
  
  loadTweets();
  
  $("form").on("submit", function (event) {
   
  event.preventDefault();
  const $tweetText = $("form").serialize();
  const val = $("#tweet-text").val();
  if (val.length === 0) {
     showError("Empty Form");
  } else if (val.length > 140) {
     showError();
  } else {
    if ($('.error').length) {
       $('.error').slideUp("fast", function () {
         $('.error').hide();
      });
    }
    $.post("/tweets", $tweetText)
      .then(() => {
        $.getJSON("/tweets", function (response) {
          let $data = createTweetElement(response[response.length - 1]);
          $('#tweet-container').prepend($data);
        });
      });
    }
  });

  $("#nav-options").on("click", function() {
    $(".new-tweet-container").slideDown();
    $("#tweet-text").focus();

  });

});
