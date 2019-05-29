Backbone = require 'backbone'
template = -> require('./form.jade') arguments...
_ = require 'underscore'
gemup = require '@artsy/gemup'

module.exports = class GeminiForm extends Backbone.View

  className: 'gemini-form'

  initialize: (options) ->
    @$el.html template()
    defaults =
      acl: 'public-read'
      app: sd.GEMINI_ACCOUNT_KEY
    opts = _.extend defaults, options

    geminiUpload = (file) ->
      gemup(file, opts)
    @$("input[type='file']").on("change", (e) -> geminiUpload(e.target.files[0]))

