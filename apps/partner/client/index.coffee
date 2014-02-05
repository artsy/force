_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Partner       = require '../../../models/partner.coffee'
Profile       = require '../../../models/profile.coffee'
ContactView   = require './contact.coffee'

{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

tabToView =
  contact: ContactView

module.exports.PartnerView = class PartnerView extends Backbone.View

  defaults:
    tabs: []
    currentTab: 'overview'

  initialize: (options={}) ->
    { @tabs, @currentTab } = _.defaults options, @defaults
    @initTabs()
    @initContent()
    @following = new Following(null, kind: 'profile') if sd.CURRENT_USER?
    @initFollowButton()
    @following?.syncFollows [@model.get('id')]

  initTabs: ->
    return

  initContent: ->
    new tabToView[@currentTab]?(
      el: @$('.partner-content')
      model: @model
    )

  initFollowButton: ->
    @followButtons = new FollowButton
      analyticsFollowMessage: 'Followed partner profile from /partner'
      analyticsUnfollowMessage: 'Unfollowed partner profile from /partner'
      el: @$(".partner-actions .partner-follow")
      following: @following
      model: @model

module.exports.init = ->
  new PartnerView
    model: new Profile sd.PROFILE
    el: $('#partner')
    tabs: sd.TABS
    currentTab: sd.CURRENT_TAB
