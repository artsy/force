_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../../../test/helpers/fixtures'
Curation = require '../../../../../models/curation.coffee'
Article = require '../../../../../models/article.coffee'
Articles = require '../../../../../collections/articles.coffee'
{ resize } = require '../../../../../components/resizer'
markdown = require '../../../../../components/util/markdown.coffee'


sd = require('sharify').data

xdescribe 'EoyView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      window.matchMedia = sinon.stub().returns { matches: true }
      $.fn.scrollY = sinon.stub().returns 0
      $.fn.scrollTop = @scrollTop = sinon.stub().returns 845
      $.fn.resize = sinon.stub()
      sinon.stub Backbone, 'sync'
      @curation = new Curation
        _id: "5829db77b5989e6f98f779a5",
        intro: "Article Intro statement: Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.",
        header_video: "https://artsy-media-uploads.s3.amazonaws.com/yB2-P7P5J3v1rihLw1v8nQ%2FUrmhuJUpFOnZ52kc8DUJsg-paintbrushes_slow_1200.mp4",
        name: "Year In Art 2016",
        type: "editorial-feature",
        sections: [
          {
            headline: "The Artist Becomes Political",
            callout: "Lorum Ipsum",
            body: "In 2016, artists have produced work urging us to not simply look at painful current events we might rather ignore, but to go further—to imagine a better future. Perhaps the most prominent and controversial has been artist and activist Ai Weiwei, who made the Syrian refugee crisis the subject of his artistic practice this year, even setting up a studio on the Greek island of Lesbos where many come ashore, seeking refuge.\r\n\r\nAi provoked criticism when he posed in a black and white image that showed the artist prostrate on a Turkish beach, his body replacing that of drowned Syrian toddler Aylan Kurdi, who was the subject of a viral news photo. Both detractors and champions of Ai’s rendition shared it widely across social media, and for a brief moment, the all-too-quickly repressed struggle faced by migrants once again made headlines. Ai even brought the crisis to the United States with “Laundromat,” an installation at New York’s Deitch Projects of thousands of pristine and folded garments collected from an abandoned refugee camp. The thesis is simple: if we look, we will act. It goes to show art isn’t simply political—art can change politics.",
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            caption: "Installation view of Carrie Mae Weems.",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/Aw572XiO__5T0T-Tc0j4SA%2FF+Lotus%2C+2016.mp4",
            caption_second: "Lorum Ipsum caption"
          },
          {
            headline: "headline 2",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.mp4",
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg"
          },
          {
            headline: "headline 3",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.mp4",
            headline: "headline 4"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 5"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 6"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 7"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 8"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 9"
          },
          {
            image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 10"
          },
        ]
      sd.CURATION = @curation.toJSON()
      @options = {
        curation: @curation,
        article: new Article(fixtures.article),
        superSubArticles: new Articles(),
        sd: sd,
        markdown: markdown,
        asset: ->
      }
      benv.render resolve(__dirname, '../../../components/eoy/templates/index.jade'), @options, =>
        { EoyView } = mod = benv.requireWithJadeify resolve(__dirname, '../../../components/eoy/client'), ['bodyView']
        mod.__set__ 'initCarousel', @carousel = sinon.stub()
        @playVideo = sinon.stub EoyView::, 'playVideo'
        boundaryArray = [4931.6875, 6317.1875, 9595.125, 12164.203125, 14924.03125, 18523.484375, 21394.359375, 24569.453125, 27352.703125, 29895.953125, 32703.140625, 35213.125, 35293.125]
        @getBodySectionTopBoundaries = sinon.stub(EoyView::, 'getBodySectionTopBoundaries').returns boundaryArray

        @view = new EoyView
          curation: @curation,
          el: $('body')
        @view.windowPosition = 0
        @view.windowHeight = 900
        done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'renders content from curation and superarticle', ->
      $('.scroller__items section').should.have.lengthOf 12
      $('.article-sa-sticky-header').should.have.lengthOf 1

    it 'closes all scroller sections on load', ->
      $('.scroller__items section[data-state=open]').should.have.lengthOf 0

  describe '#watchWindow', ->

    it 'resets section boundaries when window changes size', ->
      $(window).resize()
      $.fn.resize.args[0][0]()
      @getBodySectionTopBoundaries.callCount.should.equal 2

  describe '#getScrollZones', ->

    it 'returns an array of heights that corresponds to each section', ->
      zones = @view.getScrollZones()
      zones[0].should.equal 845
      zones[1].should.equal 1413
      zones[2].should.equal 1961
      zones[3].should.equal 2509
      zones[4].should.equal 3057
      zones[5].should.equal 3605
      zones[6].should.equal 4153
      zones[7].should.equal 4701
      zones[8].should.equal 5249
      zones[9].should.equal 5797
      zones[10].should.equal 6345

  describe '#closestSection', ->

    it 'returns the section closest to where user scrolls', ->
      @view.closestSection(0, @view.getScrollZones()).should.equal 0
      @view.closestSection(3000, @view.getScrollZones()).should.equal 4

  describe '#doSlider', ->

    it 'opens containers on scroll', ->
      @view.doSlider($(window).scrollTop())
      $('.scroller__items section[data-section=0]').height().should.equal 0
      $('.scroller__items section[data-state=open]').should.have.lengthOf 3

  describe '#animateBody', ->

    it 'adds a class to the closest section', ->
      @view.animateBody(10000)
      $('.article-body section[data-section="1"]').hasClass('active').should.not.be.true()
      $('.article-body section[data-section="2"]').hasClass('active').should.be.true()

  describe '#setupVideos', ->

    xit 'calls play video for each video', ->
      @view.setupVideos()
      $('.video-controls').waypoint.args[4][0]()
      $('.video-controls').waypoint.args[5][0]()
      $('.video-controls').waypoint.args[6][0]()
      $('.video-controls').waypoint.callCount.should.equal 7

  describe '#watchScrolling', ->

    it 'handles the top of the page', ->
      @scrollTop.returns 0
      @view.openHeight = -1
      @view.watchScrolling()
      $('.scroller__items section[data-section="1"]').data('state').should.equal 'closed'
      $('.scroller__items section[data-section="0"]').data('state').should.equal 'open'

    it 'handles the middle of the body', ->
      @view.doSlider = sinon.stub()
      @scrollTop.returns 100
      @view.openHeight = 300
      @view.watchScrolling()
      @view.doSlider.callCount.should.equal 1
      @view.doSlider.reset()

    it 'handles the bottom of the page', ->
      @view.animateBody = sinon.stub()
      @scrollTop.returns 9000
      @view.watchScrolling()
      @view.animateBody.callCount.should.equal 1
      @view.animateBody.reset()

  describe '#setupSliderHeight', ->

    it 'sets height based on position', ->
      @view.windowHeight = 900
      @view.setupSliderHeight()
      @view.containerHeight.should.equal 845
      @view.activeHeight.should.equal 548
      @view.openHeight.should.equal 6948

    it 'sets up heights for the scroller', ->
      @view.setupSliderHeight()
      $('.scroller__items section[data-section=0]').height().should.equal 845
      @view.containerHeight.should.equal 845
      @view.activeHeight.should.equal 548
      @view.openHeight.should.equal 6948

  describe '#deferredLoadBody', ->

    it 'loads the body contents', ->
      $(@view.el).html().should.containEql 'In 2016, artists have produced work urging us'

  describe '#bodyInView', ->

    it 'sets waypoints', ->
      @view.bodyInView()
      $('.article-body').waypoint.args[1][1].offset.should.equal '50%'
      $('.article-body').waypoint.args[2][1].offset.should.equal '100%'
      $('.article-body').waypoint.args[3][1].offset.should.equal '0'

  describe '#setupCarousel', ->

    it 'calls initCarousel', ->
      @view.setupCarousel()
      @carousel.callCount.should.equal 1
