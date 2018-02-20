_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap.coffee'
ContactView = require './view.coffee'


module.exports.init = ->
  bootstrap()

  new ContactView
    el: $('.contact-page')
