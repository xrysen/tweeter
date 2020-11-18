/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "createdAt": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "createdAt": 1461113959088
  }
]

const currentDate = new Date(Date.now());

const createTweetElement = (tweet) => {
  const createdAt = new Date(tweet.createdAt);
  let dateDifference = currentDate.getTime() - createdAt.getTime();
  let differenceInDays = Math.round(dateDifference / (1000 * 3600 * 24));
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

$(document).ready(function() {
  renderTweets(data);
});
