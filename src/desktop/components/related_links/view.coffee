_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class RelatedLinksView extends Backbone.View
  headerTemplate: _.template ''
  wrapperTemplate: _.template '<div><%= links %></div>'
  className: 'artist-related-genes related-links bisected-header-cell-section'

  defaults:
    displayKey: 'name'
    displayValue: 'href'

  template: (data) ->
    @headerTemplate(data) + @wrapperTemplate(data)

  initialize: (options = {}) ->
    { @displayKey, @displayValue } = _.defaults options, @defaults
    @listenTo @collection, 'sync', @render

  link: ([k, v]) ->
    "<a href='#{v}'>#{k}</a>"

  links: (keys, values) ->
    _.map(_.zip(keys, values), @link).join ', '

  fnOrAttr: (x) ->
    @collection.map (m) -> m[x]?() or m.get(x)

  render: ->
    if @collection.length
      @$el
        .html(@template(links: @links @fnOrAttr(@displayKey), @fnOrAttr(@displayValue)))
        .addClass 'is-fade-in'
    else
      @remove()
    this
