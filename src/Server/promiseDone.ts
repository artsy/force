// @ts-expect-error next-line
if (typeof Promise.prototype.done !== "function") {
  // @ts-expect-error next-line
  Promise.prototype.done = function (_onFulfilled, _onRejected) {
    // eslint-disable-next-line
    var self = arguments.length ? this.then.apply(this, arguments) : this
    self.then(null, err => {
      setTimeout(() => {
        throw err
      }, 0)
    })
  }
}
