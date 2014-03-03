_               = require 'underscore'
Backbone        = require 'backbone'
benv            = require 'benv'
sinon           = require 'sinon'
sd              = require('sharify').data
PartnerShow     = require '../../../models/partner_show.coffee'
Profile         = require '../../../models/profile.coffee'
{ fabricate }   = require 'antigravity'
{ resolve }     = require 'path'

describe 'Partner Show View', ->

  before (done) ->
    benv.setup =>
      sd.ARTSY_URL = 'localhost:3003'
      sd.ASSET_PATH = 'assets/'
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $
      @PartnerShowView = benv.requireWithJadeify resolve(__dirname, '../client/index.coffee'), ['artworkColumns']
      @PartnerShowView.__set__ 'CarouselView', benv.requireWithJadeify resolve(__dirname, '../../../components/carousel/view.coffee'), ['carouselTemplate']
      @PartnerShowView.__set__ 'PartnerShowButtons', @PartnerShowButtons = sinon.stub()
      carouselView = @PartnerShowView.__get__ 'CarouselView'
      carouselView.setStops = sinon.stub()
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  beforeEach ->
    @show = new PartnerShow fabricate 'show', { images_count: 6, eligible_artworks_count: 6 }
    @profile = new Profile fabricate 'partner_profile'
    @installShots = [
      fabricate 'artwork_image', { default: true }
      fabricate 'artwork_image'
      fabricate 'artwork_image'
      fabricate 'artwork_image'
      fabricate 'artwork_image'
      fabricate 'artwork_image'
    ]
    @artworks = [
      fabricate 'artwork'
      fabricate 'artwork'
      fabricate 'artwork'
      fabricate 'artwork'
      fabricate 'artwork'
      fabricate 'artwork'
    ]
    @view = new @PartnerShowView.PartnerShowView
      el   : $("<div id='show'>
        <div class='show-artworks'></div>
        <div class='show-share'></div>
        <div class='carousel'></div>
        </div>")
      model: @show

  describe '#initialize', ->

    it 'renders install shots and artwork columns', ->
      @view.model.should.equal @show

      Backbone.sync.args[0][2].success @installShots
      # 3x the number of install shots
      @view.$('.carousel-figure').length.should.equal 18

      Backbone.sync.args[1][2].success @artworks
      Backbone.sync.args[1][2].success []

      @view.$('.artwork-item').length.should.equal 6

    it 'adds the partner shows view', ->
      @PartnerShowButtons.calledWithNew.should.be.ok
