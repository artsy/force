_ = require 'underscore'
Backbone = require 'backbone'
Profile = require '../../models/profile.coffee'
{ Following, FollowButton } = require '../../components/follow_button/index.coffee'
CurrentUser = require '../../models/current_user.coffee'
ShowInquiryModal = require '../contact/show_inquiry_modal.coffee'

module.exports = class PartnerShowButtons extends Backbone.View

  initialize: (options) ->
    _.extend @, options

    user = CurrentUser.orNull()
    @following = new Following(null, kind: 'profile') if user
    new FollowButton
      el: @$('.plus-follow-button')
      modelName: 'profile'
      model: new Profile(id: @model.get('partner')?.default_profile_id)
      following: @following
      context_module: options.context_module

    @following.syncFollows [@model.get('partner')?.default_profile_id] if user

  events:
    'click .partner-buttons-contact': 'contactGallery'

  contactGallery: ->
    new ShowInquiryModal show: @model
