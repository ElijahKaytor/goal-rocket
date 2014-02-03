var errs = require('./errors.js').notifyUsers;

module.exports = function(sequelize, DataTypes) {
    var notify_users = sequelize.define('notify_users', {
        email: {
            type:   DataTypes.STRING(128),
            unique: true, // { msg: 'Already in DB' },

            validate: {
                isEmail:  { msg: errs.msg.invalidEmail },
                notNull:  { msg: errs.msg.isNull },
                notEmpty: { msg: errs.msg.isEmpty  },
            },
        },
    });

    return notify_users;
};
