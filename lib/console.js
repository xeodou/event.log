var colors = require('colors'),
    events = require('events'),
    util = require('util');


module.exports = Console = function() {
    if (!(this instanceof Console)) return new Console();
};

/**
 *
 * Add event prototype function
 *
 */
Console.prototype = new events.EventEmitter;

/**
 * Console Log.
 *
 * Passes the parameters to `console.log`.
 *
 */

Console.prototype.log = function() {
    var str = util.format.apply(this, arguments);
    var self = this;
    if (isDev()) {
        str = '[log] '.cyan + str;
        console.log(str);
    } else {
        self.emit('console.log', {
            type: 'log',
            signature: Date.now(),
            message: str
        });
    }
};

/**
 * Console Warning.
 *
 * Passes the parameters to `console.warn`.
 *
 */

Console.prototype.warn = function() {
    var str = util.format.apply(this, arguments);
    var self = this;
    if (isDev()) {
        str = '[warn] '.yellow + str;
        console.log(str);
    } else {
        self.emit('console.warn', {
            type: 'warn',
            signature: Date.now(),
            message: str
        })
    }
};

/**
 * Console Error.
 *
 * Passes the parameters to `console.error`.
 *
 */

Console.prototype.error = function() {
    var str = util.format.apply(this, arguments);
    var self = this;
    if (isDev()) {
        str = '[error] '.red + str;
        console.log(str);
    } else {
        self.emit('console.error', {
            type: 'error',
            signature: Date.now(),
            message: str
        })
    }
};

/**
 * Console Error.
 *
 * Passes the parameters to `console.error`.
 *
 */

Console.prototype.trace = function() {
    var str = util.format.apply(this, arguments);
    var self = this;
    if (isDev()) {
        str = '[trace] '.green + str + ' ' + new Error().stack.replace('Error', '');
        console.log(str);
    } else {
        self.emit('console.trace', {
            type: 'trace',
            signature: Date.now(),
            message: new Error().stack.replace('Error', '')
        })
    }
};

/**
 * RAW Console Log.
 *
 * Passes the parameters to `console.log` with no prefix.
 *
 *
 */

Console.prototype.raw = function() {
    var str = util.format.apply(this, arguments);
    var self = this;
    if (isDev()) {
        console.log(str);
    } else {
        self.emit('console.raw', str)
    }
};

/**
 * Util function check env
 *
 */

function isDev() {
    return process.env.DEBUG || (process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'dev') || (process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === 'debug') || (process.env.NODE_ENV === 'DEBUG') || false;
}
