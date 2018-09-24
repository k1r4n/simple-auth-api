const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const winston = require('../services/winston');

module.exports = {
    createHash: function (password) {
        const logger = winston.getClient();
        return new Promise((resolve, reject) => {
            try {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                resolve(hash);
            } catch (error) {
                logger.error(`Bcrypt error: ${error.message}`);
                reject(error.message);
            }
        });
    },
    verifyPassword: function (password, hash) {
        const logger = winston.getClient();        
        return new Promise((resolve, reject) => {
            try {
                const passwordValid = bcrypt.compareSync(password, hash);
                resolve(passwordValid);
            } catch (error) {
                logger.error(`Bcrypt error: ${error.message}`);
                reject(error.message);
            }
        });
    },
};