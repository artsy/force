fs = require 'graceful-fs'
request = require 'superagent'
{ resolve } = require 'path'
cache = require '../../../lib/cache'
{ REFLECTION_URL } = require '../../../config'

module.exports = class Reflection
  url: ->
    REFLECTION_URL + @path

  constructor: ({ @path }) -> #

  request: ->
    request.get(@url()).type('text/html; charset=utf8')

  render: (cb, next) ->
    cache.get @url(), (err, cached) =>
      return next() if err?
      return cb(cached) if cached?

      @request().end (res) =>
        return next() if res.error
        cb (response = @injectAnalytics res.text)
        cache.set @url(), response

  renderAnalytics: ->
    [
      '../../../components/main_layout/templates/mixpanel.html'
      '../../../components/main_layout/templates/google_analytics.html'
    ]
      .map((path) ->
        fs.readFileSync(resolve __dirname, path).toString()
      ).join ''

  injectAnalytics: (response) ->
    response.replace '</body></html>', "#{@renderAnalytics()}</body></html>"
