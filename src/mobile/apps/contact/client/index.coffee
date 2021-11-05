{ bootstrap } = require '../../../components/layout/bootstrap'
ContactView = require './view.coffee'


module.exports.init = ->
  bootstrap()

  new ContactView
    el: $('.contact-page')
