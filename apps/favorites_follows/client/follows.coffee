{ FollowsView } = require '../../../components/favorites/client/follows.coffee'

module.exports.init = ->
  new FollowsView
    el: $('body')
    pageSize: 10