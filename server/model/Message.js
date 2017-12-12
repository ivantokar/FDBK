const Sequelize = require('sequelize')
    , sequelize = require('../db_connect');

let Message = sequelize.define('message', {
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            len: {
                args: [6, 128],
                msg: "Email address must be between 6 and 128 characters in length"
            },
            isEmail: {
                msg: "Email address must be valid"
            }
        }
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            max: 1000
        }
    }
});

module.exports = Message;