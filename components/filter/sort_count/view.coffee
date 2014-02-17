_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../bordered_pulldown/view.coffee'

module.exports = class FilterSortCount extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderTotal
    new BorderedPulldown el: @$('.bordered-pulldown')

  renderTotal: =>
    @$('.filter-sort-count-total').text @counts.get('total')

  events:
    'click .bordered-pulldown-options a': 'sort'

  sort: (e) ->
    @params.set sort: $(e.target).data('sort')