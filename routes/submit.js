var db   = require('../models');
var errs = require('../models/errors.js').notifyUsers;


// Redirect to '/'
var submitGet = function(req, res) {
    res.redirect('/');
};

/* 
 * Adds emails from POST requests to `notify_users` table; AJAX or normal POST
 * requests are accepted. If the request is AJAX a JSON struct will be returned
 * otherwise be redirected
 *
 * Redirections (always 307);
 *  Success: '/#success'
 *  Error:   '/#error'
 *
 * JSON Responses (HTTP code):
 *  Success (201): null
 *
 *  Failure (412): { status: bool, err: string }
 *    Status - True if `email` is in/was added to the database
 *    Error  - If `status` is false, description of why it failed
 */
var submitPost = function(req, res) {
    db.notify_users.create({
        email: req.body.email,
    })
    .success(function(notifyUser) {
        submitPost_createSuccess(req, res, notifyUser);
        res.end();
    })
    .error(function(err) {
        submitPost_createError(req, res, err);
        res.end();
    });
};

// submitPost helper
var submitPost_createSuccess = function(req, res, item) {
    if (req.xhr) {
        res.json(201, null);
    } else {
        res.redirect('/#success');
    }
};

// submitPost helper
var submitPost_createError = function(req, res, err) {
    if (!req.xhr) {
        res.redirect('/#error');

        return;
    }

    var sts    = false;
    var errMsg = 'Unknown error';

    // Two types of errors from db.create()
    if (err.email) {  // Validation failure
        var errEmail = err.email[0];

        for (var i in errs.msg) {
            if (errs.msg[i] === errEmail) {
                errMsg = errs.msg[i];

                break;
            }
        }
    } else {  // DB failure
        var dbErrCode = err.code;

        for (var i2 = 0; i2 < errs.dbErrCodes.length; i2++) {
            var errCode = errs.dbErrCodes[i2];

            if (errCode.code === dbErrCode) {
                sts    = errCode.sts || sts;
                errMsg = errCode.msg;

                break;
            }
        }
    }

    // 412 - Precondition failed
    res.json(412, { 'status': sts, 'err': errMsg });
};

exports.submit = {
    get:  submitGet,
    post: submitPost,
};
