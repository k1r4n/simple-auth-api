const config = require('../config');

module.exports = {
    isNameValid: function (name) {
        var error = '';
        if (name) {
            if (name === '') {
                error = 'Field cannot be empty';
            } else if (!config.regEx.name.test(name)) {
                error = 'Only Alphabets allowed';
            }
        } else {
            error = 'Filed cannot be empty';            
        }
        return error;
    },
    isEmailValid: function (email) {
        var error = ''
        if (email) {
            if (email === '') {
                error = 'Field cannot be empty';
            } else if (!config.regEx.email.test(email)) {
                error = 'Enter a valid email';
            }
        } else {
            error = 'Filed cannot be empty';
            
        }
        return error;
    },
    isObjectEmpty: function (object) {
        for(var key in object) {
            if(object.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
};