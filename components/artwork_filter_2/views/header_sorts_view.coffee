_ = require 'underscore'
BorderedPulldown = require '../../bordered_pulldown/view.coffee'
template = -> require('../templates/header_sorts_view.jade') arguments...

sorts =
  '-partner_updated_at': 'Recently Updated'
  '-published_at': 'Recently Added'
  '-year': 'Artwork Year (desc.)'
  'year': 'Artwork Year (asc.)'

module.exports = class ArtworkFiltersSortsView extends BorderedPulldown

  initialize: ({ @params }) ->
    # Render the template once when the params are first set.
    # Afterwards, the superclass handles changes in the selection.
    @listenToOnce @params, 'firstSet', @render

  render: ->
    sort = @params.get('sort')
    currentSort = sorts[sort]
    @$el.html template { currentSort, sorts }

  select: (e) ->
    super
    e.preventDefault()
    key = ($el = $(e.target)).data('key')
    value = $el.data('value')
    @params.updateWith key, value
