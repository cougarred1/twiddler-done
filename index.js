$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clears the body

  //TIPS PSEUDOCODE
  /**
   * streams.home is an array of all the tweets that possibly exist
   * $tweetsDiv is a div element tag that includes the $tweet div, which has the text of the entire tweets
   */

  //$tweetsDiv representing a div tag of all tweets
  const $tweetsDiv = $('<div id="tweets">');
  $body.append($tweetsDiv);
  let nameTracker;

  function makeNewTweets(array) {

    array.forEach(tweet => {

      let $tweet = $('<div></div>');
      let $userName = $(`<span class="username">@${tweet.user}</span>`)

      //use the moment() function on the created_at property on each tweet
      let timeAgo = moment(tweet.created_at).fromNow();
      $tweet.text(`: ${tweet.message} - ${timeAgo}`);

      $tweetsDiv.prepend($tweet);
      $tweet.prepend($userName)

      $('.username').on('click', function () {
        let username = $(this).text();
        console.log(username);

        $tweetsDiv.html('');
        $tweetsDiv.prepend(makeNewTweets(streams.users[username]));

      });
    });
  }


  //create a button that updates the feed
  $button = $('<button id="update-feed">Refresh</button>')
  $body.prepend($button);

  $button.click(function () {


    let tweets = streams.home;

    nameTracker = null;

    tweets.sort((a, b) => b.created_at - a.created_at);

    $tweetsDiv.html('');


    $tweetsDiv.append(makeNewTweets(tweets));
  })

  // Input fields for username and tweet message
  let $userInput = $('<input type="text" id="user-input" placeholder="Type user here">');
  let $tweetInput = $('<input type="text" id="tweet-input" placeholder="Type tweet here">');
  let $tweetButton = $('<button id="tweet-button">Tweet</button>');

  $body.prepend($tweetInput);
  $body.prepend($userInput);
  $body.prepend($tweetButton);

  // Event handler for posting a tweet

  $tweetButton.click(function () {


    let message = $tweetInput.val();
    let user = $userInput.val();
    
    window.visitor = user;
    streams.users[user] = [];

    writeTweet(message);
    makeNewTweets(streams.users[user]);

  })

  makeNewTweets(streams.home);
});