Backbone = require 'backbone'
scrollTo = require '../../../../components/smooth_scroll/index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class SettingsSectionsView extends Backbone.View
  events:
    'click .js-settings-section-link': 'navigate'

  initialize: ->
    @sections = new Backbone.Collection
    @listenTo @sections, 'reset', @render

  navigate: (e) ->
    e.preventDefault()
    id = $(e.currentTarget).attr 'href'
    scrollTo @view.$(id)

  update: ({ @view }) ->
    sections = @view.$('.js-settings-section')
      .map -> $(this).data()
      .get()

    @sections.reset sections

  render: ->
    @$el.html template
      sections: @sections.toJSON()
    this
