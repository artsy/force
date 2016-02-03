Backbone = require 'backbone'
template = -> require('./index.jade') arguments...

module.exports = class SettingsTabsView extends Backbone.View
  events:
    'click .js-avant-garde-tablist__tab': 'change'

  @cache: (selector) -> -> @[selector] ?= @$(selector)

  tabs: @cache '.js-avant-garde-tablist__tab'

  update: ->
    @tabs()
      .attr 'data-state', 'inactive'
      .filter("a[href='/#{Backbone.history.fragment}']")
      .attr 'data-state', 'active'

  change: (e) ->
    e.preventDefault()
    href = $(e.currentTarget).attr 'href'
    Backbone.history.navigate href, trigger: true

  render: ->
    @$el.html template()
    this
