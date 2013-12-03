[![NPM](https://nodei.co/npm/async-listener.png?downloads=true&stars=true)](https://nodei.co/npm/async-listener/)

# process.addAsyncListener polyfill

This is an implementation of Trevor Norris's
process.{addAsyncListener,removeAsyncListener} API for adding behavior to async
calls. You can see his implementation (currently a work in progress) on
[Node.js core pull request #6011](https://github.com/joyent/node/pull/6011).
This polyfill / shim is intended for use in versions of Node prior to whatever
version of Node in which Trevor's changes finally land (anticipated at the time of
this writing as 0.11.7).

Here's his documentation of the intended API, which will probably get cleaned up
here later:

## createAsyncListener(listener[, callbacks[, storage]])

* `listener` {Function}
* `callbacks` {Object}
* `storage` {Value}

Returns a constructed `AsyncListener` object. Which can then be passed to
`process.addAsyncListener()` and `process.removeAsyncListener()`. Each
function parameter is as follows:

* `listener(storage)`: A `Function` called as an asynchronous event is
queued. If a {Value} is returned then it will be attached to the event as
`storage` and overwrite any pre-defined value passed to
`createAsyncListener()`. If a `storage` argument is passed initially then
it will also be passed to `listener()`.
* `callbacks`: An `Object` which may contain three optional fields:
  * `before(context, storage)`: A `Function` that is called immediately
  before the asynchronous callback is about to run. It will be passed both
  the `context` (i.e. `this`) of the calling function and the `storage`
  either returned from `listener` or passed during construction (if either
  was done).
  * `after(context, storage)`: A `Function` called immediately after the
  asynchronous event's callback is run. Note that if the event's callback
  throws during execution this will not be called.
  * `error(storage, error)`: A `Function` called if the event's callback
  threw. If `error` returns `true` then Node will assume the error has
  been properly handled and resume execution normally.
* `storage`: A `Value` (i.e. anything) that will be, by default, attached
to all new event instances. This will be overwritten if a `Value` is
returned by `listener()`.


## addAsyncListener(listener[, callbacks[, storage]])
## addAsyncListener(asyncListener)

Returns a constructed `AsyncListener` object and immediately adds it to
the listening queue.


## removeAsyncListener(asyncListener)

Removes the `asyncListener` from the listening queue.
