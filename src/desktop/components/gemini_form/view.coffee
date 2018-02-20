Backbone = require 'backbone'
template = -> require('./form.jade') arguments...
_ = require 'underscore'

module.exports = class GeminiForm extends Backbone.View

  className: 'gemini-form'

  initialize: (options) ->
    @$el.html template()
    defaults =
      geminiApp: sd.GEMINI_APP
      acl: 'public-read'
      s3Key: sd.GEMINI_S3_ACCESS_KEY
      geminiKey: sd.GEMINI_ACCOUNT_KEY
    @$el.geminiUpload _.extend defaults, options
