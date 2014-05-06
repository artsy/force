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
