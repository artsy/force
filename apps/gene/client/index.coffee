mediator = require '../../../lib/mediator.coffee'
Backbone = require 'backbone'
Gene = require '../../../models/gene.coffee'
CurrentUser = require '../../../models/current_user.coffee'
{ GENE, CURRENT_USER } = require('sharify').data
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
ShareView = require '../../../components/share/view.coffee'

module.exports.GeneView = class GeneView extends Backbone.View

  initialize: (options) ->
    { @user } = options
    if @user
      @followButtonView = new FollowButton
        el: $('#gene-header .follow-button')
        following: new Following null, kind: 'gene'
        model: new Gene GENE
    @shareView = new ShareView el: @$('#gene-share-buttons')

  events:
    'click #gene-header .follow-button': 'signupToFollow'

  signupToFollow: ->
    mediator.trigger 'open:auth', { mode: 'register', copy: 'Sign up to follow genes.' }

module.exports.init = ->
  new GeneView user: CurrentUser.orNull(), el: $ 'body'