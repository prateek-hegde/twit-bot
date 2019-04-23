const axios = require('axios');
const config = require("@config/setup");
const Tweet = require("@models/tweets")


module.exports.fetchTweets = async () => {

    var keyWords = ['blockchain', 'bitcoin']

    for (const i of keyWords) {
        try {
            var response = await axios({
                method: 'get',
                url: 'https://api.twitter.com/1.1/users/search.json?q=' + i,
                headers: {
                    'Authorization': `OAuth oauth_consumer_key=${config.twitter.CONSUMER_API_KEY},oauth_token=${config.twitter.ACCESS_TOKEN},oauth_signature_method="HMAC-SHA1",oauth_timestamp="1556034106",oauth_nonce="sU7c9t68sO9",oauth_version="1.0",oauth_signature="cqtuIq1%2FdV9M%2B4yDbbpNtLtUbhM%3D"`
                }
            })

            for (const tweet of response.data) {


                await Tweet.create({
                    tweetId: tweet.id,
                    created_at: tweet.created_at,
                    user_name: tweet.name,
                    description: tweet.description,
                    tweet_text: tweet.status.text,
                    retweet_count: tweet.status.retweet_count
                })

            }




        } catch (error) {
            console.log(error);

        }
    }





}

module.exports.countTweets = async (req, res) => {
    var user = req.params.user;

    try {
        var response = await axios({
            method: 'get',
            url: 'https://api.twitter.com/1.1/collections/list.json?screen_name=' + user + '&count=1',
            headers: {
                'Authorization': `OAuth oauth_consumer_key=${config.twitter.CONSUMER_API_KEY},oauth_token=${config.twitter.ACCESS_TOKEN},oauth_signature_method="HMAC-SHA1",oauth_timestamp="1556037618",oauth_nonce="sU7c9t68sO9",oauth_version="1.0",oauth_signature="cqtuIq1%2FdV9M%2B4yDbbpNtLtUbhM%3D"`
            }
        })
    } catch (error) {
        console.log(error);

    }

    if (!response) {
        return res.send({
            success: false,
            message: 'auth error'
        })
    }

    if (response.data.errors) {
        return res.send({
            success: false,
            message: 'User not found'
        })
    }

    return res.send({
        success: true,
        message: `No. of tweets ${response.data.objects.users.statuses_count}`
    })
}

module.exports.sortTweets = async (req, res) => {
    var tweetId = req.params.tweetId;

    try {
        var response = await axios({
            method: 'get',
            url: 'https://api.twitter.com/1.1/statuses/retweets/' + tweetId,
            headers: {
                'Authorization': `OAuth oauth_consumer_key=${config.twitter.CONSUMER_API_KEY},oauth_token=${config.twitter.ACCESS_TOKEN},oauth_signature_method="HMAC-SHA1",oauth_timestamp="1556037618",oauth_nonce="sU7c9t68sO9",oauth_version="1.0",oauth_signature="cqtuIq1%2FdV9M%2B4yDbbpNtLtUbhM%3D"`
            }
        })
    } catch (error) {
        console.log(error);

    }

    if (!response) {
        return res.send({
            success: false,
            message: 'auth error'
        })
    }

    if (response.data.errors) {
        return res.send({
            success: false,
            message: 'User not found'
        })
    }

    return res.send({
        success: true,
        message: `No. of tweets ${response.data.objects.users.statuses_count}`
    })
}