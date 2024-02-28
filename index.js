
$(document).ready(() => {
  const $body = $('body');
  $body.html(''); //clears the body

    const $tweetsDiv = $('<div id=tweets>');
    $body.append($tweetsDiv);
    const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div></div>');
    const text = `@${tweet.user}: ${tweet.message}`;
    
    function makeNewTweets(){
        
    }

    $tweet.text(text);

    return $tweet;
  });
  $tweetsDiv.append($tweets);

});
