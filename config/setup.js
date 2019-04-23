module.exports = {
    database: process.env.DB_URL,
    PORT: process.env.DB_URL,
    twitter: {
        CONSUMER_API_KEY: process.env.CONSUMER_API_KEY,
        CONSUMER_SECRETE_KEY: process.env.CONSUMER_SECRETE_KEY,
        ACCESS_TOKEN: process.env.ACCESS_TOKEN,
        SECRETE_ACCESS_TOKEN: process.env.SECRETE_ACCESS_TOKEN
    }
}