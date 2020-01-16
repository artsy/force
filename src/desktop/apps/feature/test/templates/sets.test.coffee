jade = require 'jade'
path = require 'path'
fs = require 'fs'
benv = require 'benv'
{ fabricate } = require '@artsy/antigravity'
FeaturedSet = require '../../../../models/featured_set.coffee'
FeaturedLinks = require '../../../../collections/featured_links.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'Featured Sets', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @sd = API_URL: 'http://localhost:5000'
    @set = new FeaturedSet
      owner: fabricate('feature', image_versions: ['wide'])
      id: "52b347c59c18db5aef000208"
      published: true
      key: "1"
      name: "The Best of 2013"
      description: "From launching our [mobile app](//link-to-mobile-app) to bringing you fairs, features, and biennials from around the globe, 2013 was a big year at Artsy. Discover our highlights from the past year, and find out what we—and a few of our favorite influencers—think you should keep your eye on in 2014."
      item_type: "FeaturedLink"
      type: "featured links"
      owner_type: "Feature"

  describe 'template', ->
    it 'renders the name of the set', ->
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-title').should.have.lengthOf 1
      $html.find('.feature-set-title').text().should.containEql @set.get('name')

    it 'renders the set description if there is one', ->
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-description').should.have.lengthOf 1
      $html.find('.feature-set-description').text().should.equal @set.mdToHtmlToText 'description'

    it 'renders without a title or description', ->
      @set.set description: null, name: null
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-title').should.have.lengthOf 0
      $html.find('.feature-set-description').should.have.lengthOf 0
      $html.is('.feature-set').should.be.true()
      $html.is(':empty').should.be.true()

  describe "fetured links", ->
    it 'renders a featured link', ->
      @set.set 'data', new FeaturedLinks([ fabricate('featured_link')])
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-item').should.have.lengthOf 1

  describe "videos", ->
    it 'renders videos', ->
      @set.set 'data', new FeaturedLinks([ fabricate('featured_link')])
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-item').should.have.lengthOf 1

  describe "sale artworks", ->
    it 'renders sale artworks in an artwork column component', ->
      @set.set 'type', 'artworks'
      $html = $(render('sets')(sets: [@set]))
      $html.find('#feature-artworks').should.have.lengthOf 1
