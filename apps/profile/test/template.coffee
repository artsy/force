_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Profile            = require '../../../models/profile'
Profile         = require '../../../models/profile'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Profile', ->

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @profile = new Profile fabricate 'profile'
    @html = render('template')({
      sd      : @sd
      profile : @profile
    })

  describe 'template', ->

    it 'renders profile header', ->
      $ = cheerio.load @html
      $('#profile').html().should.contain 'Craig Spaeth'
