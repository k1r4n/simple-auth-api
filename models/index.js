const Promise = require('bluebird');

let data = require('./data');

const winston = require('../services/winston');
module.exports = {
    getUser: async function (email) {
        const logger = winston.getClient();
        return new Promise((resolve, reject) => {
            try {
                let userData;
                data.map((user) => {
                    if (user.email === email) {
                        userData = user;
                    }
                });
                resolve(userData);
            } catch (error) {
                logger.info(error);
                reject(error);
            }
        });
    },
    updatePassword: async function (user) {
        const logger = winston.getClient();
        return new Promise((resolve, reject) => {
            try {
                for (let index = 0; index < data.length; index ++) {
                    if (data[index].email === user.email) {
                        data[index].password = user.password;
                        resolve(true);
                    }
                }
                resolve(false);
            } catch (error) {
                logger.info(error);
                reject(error);
            }
        });
    },
    createAccount: async function (user) {
        const logger = winston.getClient();
        return new Promise((resolve, reject) => {
            try {
                resolve(data.push(user));
            } catch (error) {
                logger.info(error);
                reject(error);
            }
        });
    },
    addToken: async function(email, token) {
        const logger = winston.getClient();
        return new Promise((resolve, reject) => {
            try {
                for (let index = 0; index < data.length; index ++) {
                    if (data[index].email === email) {
                        data[index].token = token;
                        resolve(true);
                    }
                }
                resolve(false); 
            } catch (error) {
                logger.info(error);
                reject(error);
            }
        });
    },
    removeToken: async function (token) {
        const logger = winston.getClient();
        return new Promise((resolve, reject) => {
            try {
                for (let index = 0; index < data.length; index ++) {
                    if (data[index].token === token) {
                        delete data[index].token;
                        resolve(true);
                    }
                }
                resolve(false);
            } catch (error) {
                console.log(error);
                logger.info(error);
                reject(error);
            }
        });
    },
};