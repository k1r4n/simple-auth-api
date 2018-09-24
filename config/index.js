const config = {
    log: {
        logLevel: process.env.LOG_LEVEL,
        logFile: process.env.LOG_FILE,
    },
    apiServer: {
        port: process.env.SERVER_PORT,
    },
    regEx: {
        name: /^[a-zA-Z ]*$/,
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
};

module.exports = config;