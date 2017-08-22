import Backbone from 'backbone'
import { wrap } from 'underscore'

module.exports = (req, res, next) => {
  Backbone.sync = wrap(Backbone.sync, (sync, method, model, options = {}) => {
    if (options.headers == null) { options.headers = {} }
    options.headers['X-Request-Id'] = req.id || 'implement-me'
    sync(method, model, options)
  })
  next()
}
