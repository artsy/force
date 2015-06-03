StepView = require './step.coffee'
BookmarksView = require '../../bookmarks/view.coffee'
template = -> require('../templates/artists_in_collection.jade') arguments...

module.exports = class ArtistsInCollection extends StepView
  template: template

  __events__:
    'click button': 'serialize'

  postRender: ->
    @bookmarksView = new BookmarksView el: @$('.js-bookmark-artists'), persist: @user.id?

  serialize: (e) ->
    e.preventDefault()
    # @bookmarksView.bookmarks # Do something with them...
    @next()

  remove: ->
    @bookmarksView.remove()
    super
