// This file exports a map of errors that db models can throw

exports.notifyUsers = {
    msg: {
        invalidEmail: 'Invalid email',
        isNull:       'Value is null',
        isEmpty:      'Empty string',
    },

    dbErrCodes: [
        { code: '23505', msg: 'Email in DB', sts: true, },
    ],
};
