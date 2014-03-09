_ = require 'underscore'
FeedView = require('./feed.coffee')
PartnerShowButtons = require '../../partner_buttons/show_buttons.coffee'

module.exports = class ShowsFeed extends FeedView

  handleDoneFetching: ->
    shows = @latestItems.map (item) -> item.childModel
    @$('.unrendered-feed-item').each (index, item) =>
      $feedItem = $(item).removeClass 'unrendered-feed-item'
      model = shows[index]
      new PartnerShowButtons
        el: $feedItem.find(".partner-buttons-show-buttons")
        model: model
        followProfiles: @followProfiles
        analyticsFollowMessage: @analyticsFollowMessage
        analyticsUnfollowMessage: @analyticsUnfollowMessage

    profileIds = shows.map (s) -> s.get('partner').default_profile_id
    @followProfiles?.syncFollows profileIds
