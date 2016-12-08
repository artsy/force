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

describe 'EoyView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.fn.imagesLoaded = sinon.stub()
      $.waypoints = sinon.stub()
      $.fn.waypoint = sinon.stub()
      window.matchMedia = sinon.stub().returns { matches: true }
      $.fn.scrollY = sinon.stub().returns 0
      $.fn.scrollTop = sinon.stub().returns 806
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
              image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
              image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg"
            },
            {
              headline: "headline 3",
              image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
              image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg"
            },
            {
              image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
              image_second: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
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
        { EoyView } = benv.requireWithJadeify resolve(__dirname, '../../../components/eoy/client'), ['bodyView']
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

    it 'Renders content from curation and superarticle', ->

      $('.scroller__items section').should.have.lengthOf 11
      $('.article-sa-sticky-header').should.have.lengthOf 1

    it 'closes all scroller sections on load', ->

      $('.scroller__items section[data-state=open]').should.have.lengthOf 0

  describe '#Slider', ->

    it 'sets up heights for the scroller', ->
      @view.setupSliderHeight()
      $('.scroller__items section[data-section=0]').height().should.equal 805
      @view.containerHeight.should.equal 805
      @view.activeHeight.should.equal 528
      @view.openHeight.should.equal 6160


    it 'opens containers on scroll', ->
      @view.doSlider($(window).scrollTop())
      $('.scroller__items section[data-section=0]').height().should.equal 0
      $('.scroller__items section[data-state=open]').should.have.lengthOf 2

  describe '#closestSection', ->

    it 'returns the section closest to where user scrolls', ->
      @view.closestSection(0, @view.getScrollZones()).should.equal 0
      @view.closestSection(3000, @view.getScrollZones()).should.equal 5

  describe '#deferredLoadBody', ->
    it 'loads the body contents', ->

  describe '#watchWindow', ->
    it 'resets section boundaries when window changes size', ->

  describe '#animateBody', ->
    it 'adds a class to the closest section', ->

  describe '#playVideo', ->
    it 'hides and shows the controls, plays the video, knows if the video is already playing', ->

  describe '#setVideoWaypoints', ->
    it 'calls play video for each video', ->

  describe '#setImages', ->
    it 'uses a cloudfront src for each image', ->