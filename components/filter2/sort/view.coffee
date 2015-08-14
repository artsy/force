_ = require 'underscore'
Backbone = require 'backbone'
BorderedPulldown = require '../../bordered_pulldown/view.coffee'

module.exports = class SortView extends Backbone.View

  events:
    'click .bordered-pulldown-options a': 'setSort'

  initialize: ({@collection, @params, @facets}) ->
    new BorderedPulldown el: @$('.bordered-pulldown')
    @

  setSort: (e) ->
    @params.set sort: $(e.target).data('sort')
    false


