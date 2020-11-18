/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const currentDate = new Date(Date.now());

const createTweetElement = (tweet) => {
  const createdAt = new Date(tweet.created_at);
  const dateDifference = currentDate.getTime() - createdAt.getTime();
  const differenceInDays = Math.round(dateDifference / (1000 * 3600 * 24));
  let $tweet = $(` 
  <article class = "tweet">
  <header>
    <img src= "${tweet.user.avatars}" alt="Profile Pic">
    <span class="full-name">${tweet.user.name}</span>
    <span class="tweet-username">${tweet.user.handle}</span>
  </header>
  <main>
    ${tweet.content.text}
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
  for (const tweet of tweets) {
    let $data = createTweetElement(tweet);
    $('#tweet-container').append($data);
  }
}

$(document).ready(function () {
  
  $("form").submit(function (event) {

    event.preventDefault();
    const $tweetText = $('form').serialize();
    const val = $('#tweet-text').val();
    if (val.length === 0) {
      alert("I'm sure you have more to say than that!");
    } else if( val.length > 140) {
      alert("You've exceeded the character length!");
    } else {
      console.log("sent!");
      $.post("/tweets", $tweetText)
    }
  });
      


  const loadTweets = () => {
    $.getJSON("/tweets", function(tweets) {
     renderTweets(tweets);
    });
  }

  loadTweets();

});
