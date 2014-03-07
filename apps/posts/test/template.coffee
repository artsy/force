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

describe 'Posts', ->

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @html = render('template')({
      sd: @sd
    })

  describe 'template', ->

    it 'renders posts header', ->
      $ = cheerio.load @html
      $('#posts-page').html().should.containEql 'Posts'
      $('#posts-page').html().should.not.containEql 'undefined'
