_     = require 'underscore'
jade  = require 'jade'
path  = require 'path'
fs    = require 'fs'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Header template', ->
  it 'displays the welcome header', ->
    render('template')(sd: { HIDE_HEADER: false }).should.include 'main-layout-welcome-header'

  it 'hides the welcome header', ->
    render('template')(sd: { HIDE_HEADER: true }).should.not.include 'main-layout-welcome-header'
