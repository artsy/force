_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
SearchBarView   = require '../search_bar/view.coffee'
Following       = require '../follow_button/collection.coffee'
Bookmarks       = require './collection.coffee'
analytics       = require '../../lib/analytics.coffee'

template            = -> require('./templates/index.jade') arguments...
bookmarksTemplate   = -> require('./templates/bookmarks.jade') arguments...

module.exports = class BookmarksView extends Backbone.View
  template: ->
    template arguments...
  bookmarksTemplate: ->
    bookmarksTemplate arguments...

  events:
    'click .bookmark-artist-remove' : 'uncollect'

  initialize: (options = {}) ->
    return unless sd.CURRENT_USER?

    { @limit, @autofocus, @$collection } = options

    @render()

    @bookmarks = new Bookmarks
    @bookmarks.fetch()

    @following = new Following null, kind: 'artist'

    @autocomplete = new SearchBarView
      el    : @$('#bookmark-artists-search')
      mode  : 'artists'
      limit : @limit

    @listenTo @autocomplete, 'search:selected', @collect
    @listenTo @bookmarks, 'sync add remove', @renderCollection

    @autocomplete.$input.on 'keydown', @trapEnter

  # Hack for dealing with enter event in Typeahead:
  # (apparently an option for this is coming in the next release)
  # Trap the enter event, manaully trigger down, then tab select
  # that result, then return false
  trapEnter: (event) =>
    if event.which is 13
      (down = $.Event 'keydown').keyCode = down.which = 40
      @autocomplete.$input.triggerHandler down
      (tab = $.Event 'keydown').keyCode = tab.which = 9
      @autocomplete.$input.triggerHandler tab
      false

  collect: (e, model) ->
    @trigger 'collect'
    @bookmarks.createFromArtist model
    @autocomplete.clear()
    @following.follow model.id
    analytics.track.other 'Added an artist to their collection'

  uncollect: (e) ->
    @trigger 'uncollect'
    id      = $(e.currentTarget).data 'id'
    model   = @bookmarks.findByArtistId id
    model.destroy()
    @autocomplete.$input.focus()
    @following.unfollow id
    analytics.track.other 'Removed an artist from their collection'

  renderCollection: ->
    @trigger 'render:collection'
    (@$collection ?= @$('#bookmark-artists-results'))
      .addClass('is-fade-in')
      .html @bookmarksTemplate(bookmarks: @bookmarks)

  render: ->
    @$el.html @template(autofocus: @autofocus)
    this

  remove: ->
    @autocomplete.remove()
    super
