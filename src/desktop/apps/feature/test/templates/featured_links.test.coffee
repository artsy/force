_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
benv = require 'benv'
{ fabricate } = require '@artsy/antigravity'
FeaturedSet = require '../../../../models/featured_set.coffee'
FeaturedLink = require '../../../../models/featured_link.coffee'
FeaturedLinks = require '../../../../collections/featured_links.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'Featured Links', ->
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
      name: "Top 10 Posts"
      item_type: "FeaturedLink"
      type: "featured links"
      owner_type: "Feature"
      data: new FeaturedLinks [fabricate 'featured_link']

  describe 'template', ->
    it 'adds different layout classes depending on the size of the collection', ->
      _(5).times (n) =>
        $html = $(render('sets')(sets: [@set]))
        len = @set.get('data').length
        featuredLink = @set.get('data').first()
        $html.find('.feature-set-item').is(".feature-set-item-#{featuredLink.layoutStyle(len)}").should.be.true()
        @set.get('data').add new FeaturedLink fabricate 'featured_link'

    it 'links elements if the model has an href attribute', ->
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-item').should.have.lengthOf 1
      $html.find('.feature-set-item a').should.have.lengthOf 3

    it 'adds an image when the model has one', ->
      @set.get('data').first().set 'image_versions', ['wide', 'large_rectangle', 'medium_rectangle']
      link = @set.get('data').first()
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-item img').should.have.lengthOf 1
      $html.find('.feature-set-item img').attr('src').should.equal link.imageUrlForLayout @set.get('data').length

    it 'does not link elements if the model has no href attribute', ->
      @set.get('data').first().set 'href', null
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-item').should.have.lengthOf 1
      $html.find('.feature-set-item a').should.have.lengthOf 0

    it 'renders a caption with heading and subheading if available', ->
      link = @set.get('data').first()
      $html = $(render('sets')(sets: [@set]))
      $html.find('.feature-set-item-caption').should.have.lengthOf 1
      $html.find('.feature-set-item-caption-heading').text().should.containEql link.get('title')
      $html.find('.feature-set-item-caption-subheading').text().should.containEql link.get('subtitle')
