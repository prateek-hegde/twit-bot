const express = require("express");
var router = express();

const controller = require('@clientControllers/twitter_api')

router.get('/fetch-tweets', controller.fetchTweets)
router.get('/count-tweets/:user', controller.countTweets)
router.get('/sort-tweets/:tweetId', controller.sortTweets)
module.exports = router;