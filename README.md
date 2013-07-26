# Event.log

Event.log allow u to log info by node event.

--
# Install

` npm install event.log`

--
# Usage

Just like js console.

```
{
    var console = require('event.log')
    console.on('console.log', function(data) {
        // do something
    })
    console.log(//do something)
}
```
Event.log will check the `env.NODE_ENV` with the code blow:

```
function isDev() {
    return process.env.DEBUG || (process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'dev') || (process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === 'debug') || (process.env.NODE_ENV === 'DEBUG') || false;
}
```
If in dev mode will show the message on the Terminal currently.
If not dev mode will send the message by the event.

The event response message is like this:

```
{
    type: 'log',
    signature: 1374825996803,
    message: 'test'
}
```

--
# API

## Console.log

 Will print the log message.
 the log event is `console.log`.


## Console.error

 Will print the error message.
 the error event is `console.error`.

## Console.warn

 Will print the warn message.
 the warn event is `console.warn`.

## Console.trace

 Will print the trace
 the trace event is `console.trace`.

## Console.raw
 Will print the raw data.
 the raw event is `console.raw`.


<a name="a15"/>
# License

MIT

Copyright [2013] [<xeodou@gmail.com>]
