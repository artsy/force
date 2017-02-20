bootstrap = require '../../../components/layout/bootstrap.coffee'
NotificationsView = require './view.coffee'

module.exports = ->
  bootstrap()
  new NotificationsView el: $('body')
