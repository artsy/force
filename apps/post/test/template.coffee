_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Post            = require '../../../models/post'
Profile         = require '../../../models/profile'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partner Show', ->

  beforeEach ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @post = new Post fabricate('show')
    @profile = new Profile fabricate 'profile'
    @html = render('template')({
      sd      : @sd
      post    : @post
      profile : @profile
    })

  describe 'template', ->

    it 'renders post header', ->
      $ = cheerio.load @html
      $('#post').html().should.contain 'Craig Spaeth'
