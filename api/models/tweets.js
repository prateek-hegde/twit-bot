const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TweetSchema = new Schema({

    tweetId: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tweet_text: {
        type: String,
        required: true
    },
    retweet_count: {
        type: Number,
        required: true
    }


});

const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;

