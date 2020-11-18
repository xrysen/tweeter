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

const createNewTweetForm = () => {
  console.log("Creating new tweet");
  const newTweet = $(`
  <section class="new-tweet-container">
      <h2>Compose Tweet</h2>
      <form action="/tweets/" method="POST">
        <label for="tweet-text" class="new-tweet-title">What are you humming about?</label>
        <textarea name="text" id="tweet-text" class="tweet-text"></textarea>
        <div class="form-text">
          <div id="button-border">
            <button type="submit" id="tweet-btn">Tweet</button>
          </div>
          <output name="counter" class="counter" for="tweet-text">140</output>
        </div>
      </form>
    </section>
`);

  $('.container').prepend(newTweet);
  $('.new-tweet-container').hide();
}

$(document).ready(function () {

  $("form").submit(function (event) {
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

  $(".nav-options").click(function() {
    if( !$(".new-tweet-container").length) {
      createNewTweetForm();
      $(".new-tweet-container").slideDown(function() {
        $(".tweet-text").focus();
      });
    } else {
      $(".tweet-text").focus();
    }
  });


  loadTweets();

});
