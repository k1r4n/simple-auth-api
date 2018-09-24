const uuid = require('uuid/v4');

const models = require('../models');

const winston = require('../services/winston');

const bcrypt = require('../miscellaneous/bcrypt');
const validate = require('../miscellaneous/validate');

module.exports = {
    signup: async function(data) {
        const error = {};
        const logger = winston.getClient();
        if (validate.isNameValid(data.name) !== '') {
            error.name = validate.isNameValid(data.name);
        }
        if (validate.isEmailValid(data.email) !== '') {
            error.email = validate.isEmailValid(data.email);
        } else {
            await models.getUser(data.email).then((resp) => {
                if (resp) {
                    error.email = 'Email already exist';
                }
            }).catch(() => {
                error.code = 500;
                error.message = 'Internal Server Error';
            });
        }
        if (data.password === undefined || data.password === '') {
            error.password = 'Password cannot be empty';
        }
        if (validate.isObjectEmpty(error)) {
            return await bcrypt.createHash(data.password).then(async (resp) => {
                return await models.createAccount({ ...data, password: resp }).then(() => {
                    return { status: 200, resp: 'Success' };
                }).catch(() => {
                    return { status: 500, resp: 'Internal Server Error' };
                });
            }).catch((error) => {
                return { status: 500, resp: 'Internal Server Error' };
            });
            
        } else {
            error.message = 'Bad request';
            logger.error(`Status: ${error.code ? error.code : 400}, Response: ${error}`);
            return { status: error.code ? error.code : 400, resp: error };
        }
    },
};