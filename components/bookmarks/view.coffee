_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
SearchBarView = require '../search_bar/view.coffee'
Following = require '../follow_button/collection.coffee'
Bookmarks = require './collection.coffee'
analytics = require '../../lib/analytics.coffee'

template = -> require('./templates/index.jade') arguments...
bookmarksTemplate = -> require('./templates/bookmarks.jade') arguments...

module.exports = class BookmarksView extends Backbone.View
  template: ->
    template arguments...
  bookmarksTemplate: ->
    bookmarksTemplate arguments...

  events:
    'click .bookmark-artist-remove': 'uncollect'

  defaults:
    persist: true
    mode: 'post'

  initialize: (options = {}) ->
    { @limit, @autofocus, @mode, @persist } = _.defaults options, @defaults

    @render()

    @bookmarks = new Bookmarks
    @bookmarks.fetch() if @persist
    @following = new Following null, kind: 'artist'

    @autocomplete = new SearchBarView
      el: @$('#bookmark-artists-search')
      mode: 'artists'
      limit: @limit
      autoselect: true
      displayKind: false

    @listenTo @autocomplete, 'search:selected', @collect
    @listenTo @bookmarks, 'sync add remove', @renderCollection

  collect: (e, model) ->
    @trigger 'collect'
    send = "#{if @persist then 'create' else 'new'}FromArtist"
    @bookmarks[send] model
    @autocomplete.clear()
    @following.follow model.get('id') if @persist
    analytics.track.other 'Added an artist to their collection'

  uncollect: (e) ->
    @trigger 'uncollect'
    id = $(e.currentTarget).data 'id'
    model = @bookmarks.findByInterestId id
    model.destroy()
    @autocomplete.$input.focus()
    @following.unfollow id
    analytics.track.other 'Removed an artist from their collection'

  saveAll: ->
    @bookmarks.invoke 'save'

  renderCollection: ->
    @trigger 'render:collection'
    (@$collection ?= @$('#bookmark-artists-results'))
      .html @bookmarksTemplate(bookmarks: @bookmarks)
    _.defer =>
      @$collection.addClass('is-fade-in')

  render: ->
    @$el.html @template(autofocus: @autofocus, mode: @mode)
    this

  remove: ->
    @autocomplete.remove()
    super
