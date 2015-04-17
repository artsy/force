_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../bordered_pulldown/view.coffee'

module.exports = class SortView extends Backbone.View

  events:
    'click .bordered-pulldown-options a': 'sort'

  initialize: ({@collection, @params, @facets}) ->
    new BorderedPulldown el: @$('.bordered-pulldown')

  sort: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @params.set sort: $(e.target).data('sort')


