Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Fair = require '../../../models/fair'
Profile = require '../../../models/profile'
FairOrganizer = require '../../../models/fair_organizer'
{ Articles } = require '../../../collections/articles'
Clock = require '../../../components/clock/view.coffee'
{ resize, crop } = require '../../../components/resizer/index.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index'
articlesTemplate = -> require('../templates/articles.jade') arguments...

module.exports.FairOrganizerView = class FairOrganizerView extends Backbone.View

  initialize: ({ @articles }) ->
    @page = 0
    @articles.on 'sync', @renderArticles
    @articles.on 'request', @toggleArticlesSpinner

  renderArticles: (articles, res) =>
    if res.results.length is 0
      @$('#fair-organizer-more-articles').hide()
    else
      @toggleArticlesSpinner()
      @$('#fair-organizer-articles').html articlesTemplate
        articles: @articles.models
        crop: crop
        resize: resize
        moment: moment

  toggleArticlesSpinner: =>
    @$('#fair-organizer-more-articles').toggleClass 'is-loading'

  events:
    'click #fair-organizer-more-articles': 'moreArticles'

  moreArticles: ->
    @articles.fetch
      remove: false
      data: $.param
        'fair_ids[]': sd.FAIR_IDS
        published: true
        offset: 10 * (@page += 1)

module.exports.init = ->
  fair = new Fair sd.FAIR
  fairOrg = new FairOrganizer sd.FAIR_ORGANIZER

  @clock = new Clock
    modelName: "Fair"
    model: fair
    el: $('.fair-organizer-top__countdown__clock')
    closedText: 'TBA'
  @clock.start()

  new FairOrganizerView
    articles: new Articles(sd.ARTICLES)
    el: $('body')

  following = new Following null, kind: 'profile' if sd.CURRENT_USER
  profile = new Profile id: fairOrg.get('profile_id')

  new FollowButton
    el: $('#fair-organizer-follow')
    following: following
    model: profile
    modelName: 'profile'
    label: fairOrg.get('name')
    context_page: "Year round fair page"

  following?.syncFollows [fairOrg.get('profile_id')]
