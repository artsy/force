_ = require 'underscore'
Backbone = require 'backbone'
initWorksSection = require '../../components/works_section/index.coffee'
template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View
  subViews: []

  initialize: ({ @user, @statuses }) -> #

  postRender: ->
    { filterView } = initWorksSection
      el: @$('#artwork-section')
      model: @model
    @subViews.push filterView

  render: ->
    @$el.html template
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
    super