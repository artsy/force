jade = require 'jade'
{ resolve } = require 'path'
fs = require 'fs'
Backbone = require 'backbone'

render = ->
  filename = resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Home template', ->
  it "doesn't choke on 0 hero units", ->
    render()(
      sd: {}
      asset: (->)
      heroUnits: new Backbone.Collection
      featuredLinks: new Backbone.Collection
      featuredShows: new Backbone.Collection
      featuredArticles: new Backbone.Collection
      featuredArtists: new Backbone.Collection
      exploreSections: new Backbone.Collection
    )
