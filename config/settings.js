// Database settings
exports.dbConf = {
    user:     process.env.db_user || 'goalrocket',
    pass:     process.env.db_pass || null,         // `null` if no password
    database: process.env.db_name || 'goalrocket',

    // See http://sequelizejs.com/docs/latest/usage#options for a full
    // list of options
    options: {
        host: process.env.db_host || 'localhost',
        // default port for psql
        port:    parseInt(process.env.db_port, 10) || 5432,
        dialect: 'postgres',
    },
};

// Models to be loaded from '../models'
exports.models = [
    'notify_users',
];
