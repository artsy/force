_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
template = -> require('../../templates/sections/related_artists.jade') arguments...

module.exports = class RelatedArtistsView extends Backbone.View
  subViews: []

  initialize: ({ @section, @user }) -> #

  postRender: ->
    _.map @section.calls, (call) =>
      key = call[0]
      collection = @model.related()[key]
      $section = @$("#artist-related-#{key}-section")
      if collection.length
        subView = new ArtistFillwidthList
          el: @$("#artist-related-#{key}")
          collection: collection
          user: @user
        subView.fetchAndRender()
        @subViews.push subView
        @fadeInSection $section
      else
        $section.remove()

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  render: ->
    @$el.html template()
    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
