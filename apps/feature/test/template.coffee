_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Feature         = require '../../../models/feature'

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
    @feature = new Feature fabricate('feature', { image_versions: ['wide'] })
    @html = render('template')({
      sd      : @sd
      feature : @feature
    })

  describe 'template', ->

    it 'renders a feature image', ->
      $ = cheerio.load @html
      $('.feature-page-image').should.have.lengthOf 1
      $('.feature-page-image').attr('style').should.include @feature.imageUrl('wide')

    it 'renders the feature title', ->
      $ = cheerio.load @html
      $('.feature-page-title').should.have.lengthOf 1
      $('.feature-page-title').text().should.equal @feature.get 'name'
