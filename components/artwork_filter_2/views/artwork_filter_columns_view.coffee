_ = require 'underscore' ArtworkColumnsView = require '../../../components/artwork_columns/view.coffee'

module.exports = class ArtworkFilterColumnsView extends ArtworkColumnsView
  initalize: (options = {}) ->
    options.collection = options.filter.artworks
    super options
    @listenTo options.filter, 'change:state', @handleState

  handleState: (model, value, options) ->
    @$el.attr 'data-state', state
