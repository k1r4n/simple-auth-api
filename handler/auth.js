const uuid = require('uuid/v4');

const models = require('../models');

const winston = require('../services/winston');

const bcrypt = require('../miscellaneous/bcrypt');

module.exports = {
    login: async function(data) {
        return await models.getUser(data.email).then(async (resp) => {
            const logger = winston.getClient();
            if (resp) {
                return await bcrypt.verifyPassword(data.password, resp.password).then(async (passResp) => {
                    if (!passResp) {
                        logger.error(`Status: 401, Response: Invalid Username or Password`);            
                        return { status: 401, resp: 'Invalid Username or Password' };
                    }
                    const token = uuid();
                    return await models.addToken(data.email, token).then((tokenResp) => {
                        if (tokenResp) {
                            return { status: 200, resp: token };
                        }
                        logger.error(`Status: 500, Response: Internal Server Error`);            
                        return { status: 500, resp: 'Internal Server Error'};
                    }).catch(() => {
                        logger.error(`Status: 500, Response: Internal Server Error`);            
                        return { status: 500, resp: 'Internal Server Error'};
                    });
                }).catch(() => {
                    return { status: 500, resp: 'Internal Server Error'};
                });
            } else {
                logger.error(`Status: 401, Response: Invalid Username or Password`);            
                return { status: 401, resp: 'Invalid Username or Password'};
            }
        }).catch(() => {
            return { status: 500, resp: 'Internal Server Error'};
        });
    },
    logout: async function(token) {
        const logger = winston.getClient();
        return await models.removeToken(token).then((resp) => {
            if (resp) {
                return { status: 200, resp: 'Success' };
            }
            logger.error(`Status: 400, Invalid Token`);            
            return { status: 400, resp: 'Invalid Token' };
        }).catch(() => {
            logger.error(`Status: 500, Response: Internal Server Error`);            
            return { status: 500, resp: 'Internal Server Error' };
        });
    }
};