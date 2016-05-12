_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
Artworks = require '../../../../collections/artworks.coffee'
BorderedPulldown = require '../../../../components/bordered_pulldown/view.coffee'
initWorksSection = require '../../components/works_section/index.coffee'
template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View
  subViews: []

  initialize: ({ @user, @statuses }) ->

  postRender: ->
    initWorksSection
      el: @$('#artwork-section')
      model: @model

  render: ->
    @$el.html template hasWorks: @statuses.artworks
    _.defer => @postRender()
    this

  remove: ->
    $(window).off 'infiniteScroll'
    _.invoke @subViews, 'remove'
