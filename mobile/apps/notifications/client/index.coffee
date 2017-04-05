bootstrap = require '../../../components/layout/bootstrap'
NotificationsView = require './view'

module.exports = ->
  bootstrap()
  new NotificationsView el: $('body')
