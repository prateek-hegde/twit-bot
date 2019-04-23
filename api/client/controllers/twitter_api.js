const config = require("@config/setup");
const Tweet = require("@models/tweets")
const Twit = require('twit')

var T = new Twit({
    consumer_key: config.twitter.CONSUMER_API_KEY,
    consumer_secret: config.twitter.CONSUMER_SECRETE_KEY,
    access_token: config.twitter.ACCESS_TOKEN,
    access_token_secret: config.twitter.SECRETE_ACCESS_TOKEN,
})

module.exports.allTweets = async (req, res) => {
    try {
        var tweets = await Tweet.find()
    } catch (error) {
        console.log(error);
    }

    return res.send(tweets)
}

module.exports.fetchTweets = async () => {

    var keyWords = ['blockchain', 'bitcoin']

    for (const i of keyWords) {

        T.get('users/search', { q: i }, async (err, data, response) => {
            if (err) {
                console.log(err);

            }


            try {
                for (const tweet of data) {
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
        });

    }




}

module.exports.countTweets = async (req, res) => {
    var user = req.params.user;
    T.get('/collections/list', { 'screen_name': user }, async (err, data, response) => {
        if (err) {
            return res.send({
                success: false,
                message: err
            })
        }

        if (data.errors) {
            return res.send({
                success: false,
                message: 'User not found'
            })
        }

        var obj = data.objects.users;
        var tweetCounts = 0;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                tweetCount = obj[key].statuses_count
            }
        }



        return res.send({
            success: true,
            message: `No. of tweets ${tweetCounts}`
        })


    })






}

module.exports.sortTweets = async (req, res) => {
    var user = req.params.user;

    T.get('statuses/user_timeline', { screen_name: user }, async (err, data, response) => {

        if (err) {
            return res.send({
                success: false,
                message: err
            })
        }


        return res.send(data)

    })




}
