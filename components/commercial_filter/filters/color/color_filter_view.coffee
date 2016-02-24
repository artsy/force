_ = require 'underscore'
Backbone = require 'backbone'
template = require('./index.jade')

module.exports = class ColorFilterView extends Backbone.View
  events:
    'click svg .clickable' : 'setColor'

  colors: ['darkblue', 'lightblue', 'darkgreen', 'lightgreen', 'yellow', 'gold', 'orange', 'darkorange', 'red', 'pink', 'darkviolet', 'violet', 'black-and-white']

  initialize: ({ @params, @aggregations }) ->
    throw new Error 'Requires a params model' unless @params?
    throw new Error 'Requires an aggregations collection' unless @aggregations?

    @initialRender()

    @$clickableColors = @$('svg .clickable')
    @$checkmark = @$('.icon-check')
    @listenTo @params, 'change:color', @renderSelectedAndEmptyStates
    @listenTo @aggregations, 'reset', @renderSelectedAndEmptyStates

  setColor: (e) ->
    $target = $(e.currentTarget)
    @params.set color: $target.data('value'), page: 1

  initialRender: ->
    @$el.html template

  renderSelectedAndEmptyStates: =>
    # First remove all empty and selected states
    _.each(@$clickableColors, (color) ->
      $(color).removeAttr('data-selected')
      $(color).removeAttr('data-empty')
    )

    # Add selected states
    selected = @params.get('color')
    if selected
      @$("svg path[data-value='#{selected}']").attr('data-selected', true) if selected
      deSelectedColors = _.without(@colors, selected)
      _.each(deSelectedColors, (color) ->
        @$("svg path[data-value='#{color}']").attr('data-selected', false)
      )

    # Add empty states
    respColors = _.pluck @aggregations.get('COLOR').get('counts'), 'name'
    emptyColors = _.difference(@colors, respColors)
    _.each(emptyColors, (color) ->
      @$("svg path[data-value='#{color}']").attr('data-empty', true)
    )
