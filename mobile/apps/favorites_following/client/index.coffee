bootstrap = require '../../../components/layout/bootstrap'
FollowingView = require './following'

module.exports = ->
  bootstrap()
  new FollowingView el: $('body')
