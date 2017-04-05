_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap'
ContactView = require './view'


module.exports.init = ->
  bootstrap()

  new ContactView
    el: $('.contact-page')
