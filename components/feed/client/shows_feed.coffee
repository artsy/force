_ = require 'underscore'
FeedView = require('./feed.coffee')
PartnerShowButtons = require '../../partner_buttons/show_buttons.coffee'

module.exports = class ShowsFeed extends FeedView

  handleDoneFetching: ->
    shows = @latestItems.map (item) -> item.childModel
    for show in shows
      new PartnerShowButtons
        el: @$(".partner-buttons-show-buttons")
        model: show
        followProfiles: @followProfiles
        analyticsFollowMessage: @analyticsFollowMessage
        analyticsUnfollowMessage: @analyticsUnfollowMessage
    profileIds = shows.map (s) -> s.get('partner').default_profile_id
    @followProfiles?.syncFollows profileIds
