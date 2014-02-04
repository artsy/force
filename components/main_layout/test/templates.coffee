jade = require 'jade'
{ resolve } = require 'path'
fs = require 'fs'

render = ->
  filename = resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Main layout template', ->

  it 'includes the sharify script', ->
    render()(sd: {}, sharify: { script: -> 'foobar' }).should.include 'foobar'