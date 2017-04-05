_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
BorderedPulldown = require '../../bordered_pulldown/view'

module.exports = class FilterSortCount extends Backbone.View

  initialize: (options) ->
    _.extend @, options
    @counts.on 'sync', @renderTotal
    new BorderedPulldown el: @$('.bordered-pulldown')

  renderTotal: =>
    @$('.filter-sort-count-total').text _s.numberFormat(@counts.get 'total') + ' ' +
      if @counts.get('total') is 1 then 'Work' else 'Works'

  events:
    'click .bordered-pulldown-options a': 'sort'

  sort: (e) ->
    @params.set sort: $(e.target).data('sort')
    false
