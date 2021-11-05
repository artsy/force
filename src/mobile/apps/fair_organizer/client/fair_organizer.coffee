_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
{ bootstrap } = require '../../../components/layout/bootstrap'
{ AvantGardeTabsView } = require '../../../components/avant_garde_tabs/view'
{ Articles } = require '../../../collections/articles'
{ FollowProfiles } = require '../../../collections/follow_profiles'
{ FollowButtonView } = require '../../../components/follow_button/view'
{ FairOrganizer } = require '../../../models/fair_organizer'

articlesTemplate = -> require('../templates/articles.jade') arguments...


module.exports.FairOrganizerView = class FairOrganizerView extends Backbone.View

  initialize: ({ @articles }) ->
    @page = 0
    @articles.on 'sync', @renderArticles
    @articles.on 'request', @toggleArticlesSpinner
    @followProfiles = new FollowProfiles []
    @setupFollowButton()
    @followProfiles.syncFollows [ @model.get 'profile_id' ]

  setupFollowButton: ->
    @followButtonView = new FollowButtonView
      collection: @followProfiles
      el: @$('.fair-organization-page__notification')
      type: 'FairOrganizer'
      followId: @model.get 'profile_id'
      isLoggedIn: not _.isNull CurrentUser.orNull()
      _id: @model.get '_id'
      context_module: 'Fair organizer page'

  renderArticles: (articles, res) =>
    if res.results.length is 0
      @$('#fair-organization__articles__show-more').hide()
    else
      @toggleArticlesSpinner()
      @$('#fair-organization__articles').html articlesTemplate
        articles: @articles.models

  toggleArticlesSpinner: =>
    @$('#fair-organization__articles__show-more').toggleClass 'is-loading'

  events:
    'click #fair-organization__articles__show-more': 'moreArticles'

  moreArticles: ->
    @articles.fetch
      remove: false
      data:
        'fair_ids[]': sd.FAIR_IDS
        published: true
        offset: 10 * (@page += 1)

module.exports.init = ->
  bootstrap()
  new AvantGardeTabsView
    el: $ '#fair-organization-page'

  new FairOrganizerView
    articles: new Articles(sd.ARTICLES)
    el: $('body')
    model: new FairOrganizer(sd.FAIR_ORGANIZER)
