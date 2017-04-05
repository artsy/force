Backbone = require 'backbone'
scrollTo = require '../../../../components/smooth_scroll/index'
Sticky = require '../../../../components/sticky/index'
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

  postRender: ->
    return if @stuck
    @sticky = new Sticky
    @sticky.add @$el
    @stuck = true

  render: ->
    @$el.html template
      sections: @sections.toJSON()
    @postRender()
    this
