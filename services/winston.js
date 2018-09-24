const winston = require('winston');
const config = require('../config');

module.exports = {
    /*
        *Initialize winston client
        *params:
            *filename {string} {optional}
            *level {string}
            *handleExceptions {boolean}
            *colorize {boolean}
        *return:
            *winston {service configuration}
    */
    initialize: async function () {
        if (config.log.logFile) {
            return winston.configure({
                transports: [
                    new (winston.transports.File)({
                        filename: config.log.logFile,
                        level: config.log.logLevel,
                        handleExceptions: true,
                        colorize: true,
                    })
                ]
            });
        } else {
            return winston.configure({
                transports: [
                    new winston.transports.Console({
                        level: config.log.logLevel,
                        handleExceptions: true,
                        colorize: true
                    })
                ]
            });
        }
    },
    /*
        *Returns winston {service client}
    */
    getClient: function () {
        return winston;
    },
};