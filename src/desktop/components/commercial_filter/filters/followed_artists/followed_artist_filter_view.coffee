_ = require 'underscore'
Backbone = require 'backbone'
{ numberFormat } = require 'underscore.string'
User = require '../../../../models/user.coffee'
mediator = require '../../../../lib/mediator.coffee'
template = -> require('./index.jade') arguments...

module.exports = class FollowedArtistsFilterView extends Backbone.View
  className: 'cf-followed_artists cf-filter'
  events:
    "change [type='checkbox']" : 'toggleFollowedArtists'
    'click .cf-followed_artists__cta' : 'signup'

  initialize: ({ @params, @filter }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires a filter model' unless @filter?

    @user = User.instantiate()
    @listenTo @params, 'change:include_artworks_by_followed_artists', @trackAnalytics
    @listenTo @params, 'change:include_artworks_by_followed_artists', @render
    @listenTo @filter, 'change:followed_artists_total', @render

  toggleFollowedArtists: (e) ->
    currentValue = @params.get('include_artworks_by_followed_artists')
    if @filter.get('followed_artists_total') is 0 and !currentValue
      @params.clear(silent: true).set _.defaults include_artworks_by_followed_artists: true, @params.initialParams()
    else
      @params.set include_artworks_by_followed_artists: !currentValue, page: 1

  signup: (e) ->
    e.preventDefault()
    mediator.trigger 'open:auth',
      mode: 'register',
      copy: "Sign up to receive alerts when new works are available by artists you follow.",
      signupIntent: 'artists you follow filter'

  trackAnalytics: ->
    if @params.get('include_artworks_by_followed_artists')
      analyticsHooks.trigger 'cf:followed_artists:checked'

  render: ->
    @$el.html template
      count: @filter.get('followed_artists_total')
      selected: @params.get('include_artworks_by_followed_artists')
      numberFormat: numberFormat
      user: @user
