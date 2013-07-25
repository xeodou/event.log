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
    var args = Array.prototype.slice.call(arguments);
    var self = this;
    if (isDev()) {
        args.unshift('[log]'.cyan);
        console.log.apply(self, args);
    } else {
        args.unshift('[log]');
        self.emit('console.log', args)
    }
};

/**
 * Console Warning.
 *
 * Passes the parameters to `console.warn`.
 *
 */

Console.prototype.warn = function() {
    var args = Array.prototype.slice.call(arguments);
    var self = this;
    if (isDev()) {
        args.unshift('[warn]'.yellow);
        console.log.apply(self, args);
    } else {
        args.unshift('[warn]');
        self.emit('console.warn', args);
    }
};

/**
 * Console Error.
 *
 * Passes the parameters to `console.error`.
 *
 */

Console.prototype.error = function() {
    var args = Array.prototype.slice.call(arguments);
    var self = this;
    if (isDev()) {
        args.unshift('[error]'.red);
        console.log.apply(self, args);
    } else {
        args.unshift('[error]');
        self.emit('console.error', args);
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
    var args = Array.prototype.slice.call(arguments);
    var self = this;
    if (isDev())
        console.log.apply(self, args);
    else
        self.emit('console.raw', args)
};

/**
 * Util function check env
 *
 */

function isDev() {
    return process.env.DEBUG || (process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'dev') || (process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === 'debug') || (process.env.NODE_ENV === 'DEBUG') || false;
}
