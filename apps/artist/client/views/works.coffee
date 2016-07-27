_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
Artworks = require '../../../../collections/artworks.coffee'
BorderedPulldown = require '../../../../components/bordered_pulldown/view.coffee'
initWorksSection = require '../../../../components/artwork_filter_2/index.coffee'
template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View
  subViews: []

  initialize: ({ @user, @statuses, @artist }) ->

  postRender: ->
    initWorksSection
      $el: @$('#artwork-section')
      artistID: @model.get('id')

  render: ->
    @$el.html template
    _.defer => @postRender()
    this

