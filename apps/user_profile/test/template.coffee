_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Profile = require '../../../models/profile'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Profile', ->

  beforeEach ->
    @sd =
      API_URL: 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @profile = new Profile fabricate 'profile'
    @html = render('index')({
      sd: @sd
      profile: @profile
    })

  describe 'template', ->

    it 'renders profile header', ->
      $ = cheerio.load @html
      $('#profile').html().should.containEql 'Craig Spaeth'

    it 'does not render xss stuff', ->
      @profile = new Profile fabricate 'profile', owner: {
        name: """ '"><img src=x onerror=alert('xss'); } """
      }
      render('index')({
        sd: @sd
        profile: @profile
      }).should.not.include '<img src=x'