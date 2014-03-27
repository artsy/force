_ = require 'underscore'
Backbone = require 'backbone'
Profile = require '../../models/profile.coffee'
FollowProfileButton = require './follow_profile.coffee'
CurrentUser = require '../../models/current_user.coffee'
FollowProfiles = require '../../collections/follow_profiles.coffee'
analytics = require '../../lib/analytics.coffee'
ShowInquiryModal2 = require '../contact2/show_inquiry_modal.coffee'
ShowInquiryModal = require '../contact/show_inquiry_modal.coffee'

module.exports = class PartnerShowButtons extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @setupFollowProfiles()
    new FollowProfileButton
      el: @$('.follow-button')
      model: new Profile(id: @model.get('partner').default_profile_id)
      collection: @followProfiles
      analyticsFollowMessage: @analyticsFollowMessage
      analyticsUnfollowMessage: @analyticsUnfollowMessage

  setupFollowProfiles: ->
    return if @followProfiles
    @followProfiles = CurrentUser.orNull() and new FollowProfiles
    _.defer => @followProfiles?.syncFollows [@model.get('partner').default_profile_id]

  events:
    'click .partner-buttons-contact': 'contactGallery'

  contactGallery: ->
    if analytics.abTest 'ab:inquiry', 0.8
      new ShowInquiryModal2 show: @model
    else
      new ShowInquiryModal show: @model