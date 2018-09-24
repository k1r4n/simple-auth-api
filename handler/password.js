const models = require('../models');

const winston = require('../services/winston');
const bcrypt = require('../miscellaneous/bcrypt');

module.exports = {
    updatePassword: async function (data) {
        const logger = winston.getClient();
        return await models.getUser(data.email).then(async (resp) => {
            if (resp) {
                if (data.password === undefined || data.password === '') {
                    logger.error('Status: 400, resp: Bad Request');
                    return { status: 400, resp: 'Bad Request' };
                }

                return await bcrypt.createHash(data.password).then(async (hashResp) => {
                    return await models.updatePassword({ ...data, password: hashResp}).then((passResp) => {
                        if (passResp) {
                            return { status: 200, resp: 'Success' };
                        }
                        logger.error(`Status: 500, Response: Internal Server Error`);            
                        return { status: 500, resp: 'Internal Server Error'};
                    }).catch(() => {
                        logger.error(`Status: 500, Response: Internal Server Error`);            
                        return { status: 500, resp: 'Internal Server Error'};
                    });
                }).catch(() => {
                    return { status: 500, resp: 'Internal Server Error' };
                });
                
            } else {
                logger.info('Status: 404, Response: User Not Found');
                return { status: 404, resp: 'User Not found' };
            }
        }).catch(() => {
            return { status: 500, resp: 'Internal Server Error'};
        });
    }
}