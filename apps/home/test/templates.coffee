jade = require 'jade'
{ resolve } = require 'path'
fs = require 'fs'
CurrentUser = require '../../../models/current_user'

render = ->
  filename = resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Home template', ->

  it "doesn't choke on 0 hero units", ->
    render()(heroUnits: [], sd: {}, featuredLinks: [])

  it 'renders suggested artworks with a user', ->
    render()(
      heroUnits: []
      sd: {}
      featuredLinks: []
      user: new CurrentUser(lab_features: ['Suggested Artworks'])
    )
      .should.include 'home-suggested-artworks'