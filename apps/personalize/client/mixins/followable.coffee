Backbone        = require 'backbone'
SearchBarView   = require '../../../../components/main_layout/header/search_bar/view.coffee'

followedTemplate = -> require('../../templates/followed.jade') arguments...

# Common functionality between views with auto-complete/following
module.exports =
  initializeFollowable: ->
    @followed ||= new Backbone.Collection

    @listenTo @followed, 'add', @renderFollowed
    @listenTo @followed, 'remove', @renderFollowed

    throw 'Followable requires a @followCollection' unless @followCollection?

  setupSearch: (options={}) ->
    @searchBarView = new SearchBarView
      mode:         options.mode
      restrictType: options.restrictType
      el:           @$('#personalize-search-container')
      $input:       (@$searchInput ||= @$('#personalize-search'))

    @listenTo @searchBarView, 'search:selected', @follow

  renderFollowed: ->
    @$('#personalize-followed').html followedTemplate(models: @followed.models)

  setSkipLabel: ->
    label = if @state.almostDone() then 'Done' else 'Next'
    @$('.personalize-skip').text label
    @_labelSet = true

  follow: (e, model) ->
    @setSkipLabel() unless @_labelSet?
    @$searchInput.val '' # Clear input
    @followed.unshift model.toJSON()
    @followCollection.follow model.id, { notes: 'Followed from /personalize' }

    # Track with analytics

  unfollow: (e) ->
    id = $(e.currentTarget).data 'id'
    @followed.remove id
    @followCollection.unfollow id

    # Track with analytics
