_               = require 'underscore'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
cheerio         = require 'cheerio'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Feature         = require '../../../../models/feature'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partner Show', ->

  beforeEach ->
    @sd =
      API_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @feature = new Feature fabricate('feature', { image_versions: ['wide'] })
    @html = render('index')({
      sd      : @sd
      feature : @feature
    })

  describe 'template', ->

    it 'renders a feature image', ->
      $ = cheerio.load @html
      $('.feature-image').should.have.lengthOf 1
      $('.feature-image').attr('style').should.include @feature.imageUrl('wide')

    it 'renders the feature title', ->
      $ = cheerio.load @html
      $('.feature-title').should.have.lengthOf 1
      $('.feature-title').text().should.equal @feature.get 'name'

    it 'renders the feature description', ->
      $ = cheerio.load @html
      $('.feature-description').should.have.lengthOf 1
      $('.feature-description').text().should.equal @feature.mdToHtmlToText 'description'
