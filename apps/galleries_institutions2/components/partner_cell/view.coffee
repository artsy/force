{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
Backbone = require 'backbone'

module.exports = class PartnerCell extends Backbone.View
  initialize: ({ @partner }) ->

    following = new Following null, kind: 'artist'

    new FollowButton
      el: $('.partner-cell-follow-button')
      following: following
      model: @partner
      modelName: 'partner'

    following.syncFollows [@partner.id]