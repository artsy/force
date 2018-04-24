_ = require 'underscore'
BorderedPulldown = require '../../bordered_pulldown/view.coffee'
template = -> require('../templates/header_sorts_view.jade') arguments...


module.exports = class ArtworkFiltersSortsView extends BorderedPulldown

  initialize: ({ @params }) ->
    # Render the template once when the params are first set.
    # Afterwards, the superclass handles changes in the selection.
    @listenToOnce @params, 'firstSet', @render
    super

  sorts:
    '-decayed_merch': 'Default'
    '-partner_updated_at': 'Recently Updated'
    '-published_at': 'Recently Added'
    '-year': 'Artwork Year (desc.)'
    'year': 'Artwork Year (asc.)'

  render: ->
    sort = @params.get('sort')
    sort ?= @params.defaultParams['sort']
    currentSort = @sorts[sort]
    @$el.html template { currentSort, @sorts }
    this

  select: (e) ->
    e.preventDefault()

    $el = $(e.currentTarget)
    $el.addClass('bordered-pulldown-active')
    @$('.bordered-pulldown-text').text $el.text()
    ($pulldown = @$('.bordered-pulldown-options')).hide()
    @$el.one 'mouseout', =>
      @$('.bordered-pulldown-options').css display: ''

    key = $el.data('key')
    value = $el.data('value')
    @params.updateWith key, value

  remove: ->
    @$el.off 'mouseout'
    super
