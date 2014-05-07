_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Shows', ->

  beforeEach ->
    @sd =
      API_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @html = render('template')({
      sd: @sd
    })

  describe 'template', ->

    it 'renders shows header', ->
      $ = cheerio.load @html
      $('#shows-page').html().should.containEql 'Shows'
      $('#shows-page').html().should.not.containEql 'undefined'
