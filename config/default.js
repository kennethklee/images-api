module.exports = {
    port: process.env.PORT || 8000,
    mongo: {
        options: {
            db: {safe: true},
            auto_reconnect: true
        },
        uri: process.env.MONGO_URL || ('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT + '/images')
    },
    cloudinary: {
        name: process.env.CLOUD_NAME,
        key: process.env.CLOUD_KEY,
        secret: process.env.CLOUD_SECRET
    }
};
