_ = require 'underscore'
Backbone = require 'backbone'

module.exports.sections = sections = [
  slug: ''
  href: 'artist/:id'
  name: 'Overview'
  calls: []
  always: true
,
  slug: 'works'
  href: 'artist/:id/works'
  name: 'Works'
  calls: [
    ['artworks', [data: size: 1]]
  ]
,
  slug: 'posts'
  href: 'artist/:id/posts'
  name: 'Posts'
  calls: [
    ['posts', [data: size: 5]]
  ]
,
  slug: 'shows'
  href: 'artist/:id/shows'
  name: 'Shows'
  calls: [
    ['shows', [data: size: 5]]
  ]
,
  slug: 'press'
  href: 'artist/:id/press'
  name: 'Press'
  calls: [
    ['bibliography']
  ]
,
  slug: 'collections'
  href: 'artist/:id/collections'
  name: 'Collections'
  calls: [
    ['collections']
  ]
,
  slug: 'related-artists'
  href: 'artist/:id/related-artists'
  name: 'Related Artists'
  calls: [
    ['artists', [data: size: 10]]
    ['contemporary', [data: size: 10]]
  ]
]

module.exports.ArtistData = class ArtistData
  _.extend @prototype, Backbone.Events

  sections: sections

  constructor: ({ @model }) -> #

  sync: ->
    @synced = false
    $.when.apply(null, promises = @run())
      .then =>
        @synced = true
        @returns = @processReturns()
        @trigger 'sync:all', promises

  run: ->
    _.flatten _.map @sections, ({ calls }) =>
      _.map calls, (call) =>
        @model.related()[call[0]].fetch call[1]...

  # Returns a new sections structure with only the sections
  # that should ultimately be displayed + simultaneously
  # triggers sync events for all calls
  processReturns: ->
    _.compact _.map @sections, (section) =>
      display = _.any _.map section.calls, (call) =>
        collection = @model.related()[call[0]]
        @trigger "sync:#{call[1]}", collection.length
        collection.length isnt 0
      section if display or section.always
