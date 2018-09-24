const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');

const winston = require('../services/winston');

const authHandler = require('../handler/auth');
const passwordHandler = require('../handler/password');
const signupHandler = require('../handler/signup');

module.exports = {
    initializeServer: async function () {
        await winston.initialize();
        const logger = winston.getClient();
        
        logger.info('Initializing Express Application')
        const app = express();
    
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        // Add headers
        app.use(function (req, res, next) {
    
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');
    
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            }
            // Pass to next layer of middleware
            next();
        });
    
        app.post('/login', async (req, res) => {
            const result = await authHandler.login(req.body);
            res.status(result.status).send(result.resp);
        });
    
        app.get('/logout', async (req, res) => {
            const result = await authHandler.logout(req.headers.authorization);
            console.log(result);
            res.status(result.status).send(result.resp);
        });
    
        app.post('/create', async (req, res) => {
            const result = await signupHandler.signup(req.body);
            res.status(result.status).send(result.resp);
        });
    
        app.put('/forgot_password', async (req, res) => {
            const result = await passwordHandler.updatePassword(req.body);
            res.status(result.status).send(result.resp);
        });
    
        app.put('/reset_password', async (req, res) => {
            const result = await passwordHandler.updatePassword(req.body);
            res.status(result.status).send(result.resp);
        });
    
        app.listen(config.apiServer.port, () => logger.info(`Application listening on port ${config.apiServer.port}!`));
    },
};