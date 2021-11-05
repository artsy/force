{ bootstrap } = require '../../../components/layout/bootstrap'
FollowingView = require './following.coffee'

module.exports = ->
  bootstrap()
  new FollowingView el: $('body')
