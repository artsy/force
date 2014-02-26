_ = require 'underscore'
Backbone = require 'backbone'
Profile = require '../../models/profile.coffee'
FollowProfileButton = require './follow_profile.coffee'
ShowInquiryModal = require './show_inquiry_modal.coffee'

module.exports = class PartnerShowButtons extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    new FollowProfileButton
      el: @$('.follow-button')
      model: new Profile(id: @model.get('partner').default_profile_id)
      collection: @followProfiles
      analyticsFollowMessage: @analyticsFollowMessage
      analyticsUnfollowMessage: @analyticsUnfollowMessage

  events:
    'click .partner-buttons-contact': 'contactGallery'

  contactGallery: ->
    new ShowInquiryModal show: @model