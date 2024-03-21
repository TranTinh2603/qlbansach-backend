const config = {
    app: {
        port1: process.env.PORT || 3000,
        port2: process.env.PORT || 8888,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network"
    }
};
module.exports = config;