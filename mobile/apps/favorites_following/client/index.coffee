bootstrap = require '../../../components/layout/bootstrap.coffee'
FollowingView = require './following.coffee'

module.exports = ->
  bootstrap()
  new FollowingView el: $('body')
