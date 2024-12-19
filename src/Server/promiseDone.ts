// @ts-ignore next-line
if (typeof Promise.prototype.done !== "function") {
  // @ts-ignore next-line
  Promise.prototype.done = function (onFulfilled, onRejected) {
    // eslint-disable-next-line
    var self = arguments.length ? this.then.apply(this, arguments) : this
    self.then(null, err => {
      setTimeout(() => {
        throw err
      }, 0)
    })
  }
}
