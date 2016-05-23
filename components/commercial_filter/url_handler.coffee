Backbone = require 'backbone'
qs = require 'qs'
_ = require 'underscore'

module.exports = class UrlHandler extends Backbone.Router

  initialize: ({ @params }) ->
    throw new Error 'Requires a params model' unless @params?

    @listenTo @params, 'change', @setURL

  currentPath: ->
    params = qs.stringify @params.whitelisted()
    # custom stringification of arrays :(
    if @params.get('major_periods')?.length
      arrayString = _.map(@params.get('major_periods'), (period) -> "major_periods=#{period}").join('&')
    fragment = location.pathname
    if params
      fragment += "?#{params}"
      fragment += "&#{arrayString}" if arrayString
    else if arrayString
      fragment += "?#{arrayString}"
    fragment

  setURL: ->
    @navigate @currentPath(), replace: true
