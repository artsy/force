_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../../../test/helpers/fixtures'
EoyView = require '../../components/eoy/client.coffee'
{ resize } = require '../../../../../components/resizer'
sd = require('sharify').data

describe 'EoyView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      sinon.stub Backbone, 'sync'
      @article = new EoyView
          _id: "5829db77b5989e6f98f779a5",
          intro: "Article Intro statement: Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.",
          header_video: "https://artsy-media-uploads.s3.amazonaws.com/yB2-P7P5J3v1rihLw1v8nQ%2FUrmhuJUpFOnZ52kc8DUJsg-paintbrushes_slow_1200.mp4",
          name: "Year In Art 2016",
          type: "editorial-feature"
          sections: [
            {
              headline: "The Artist Becomes Political",
              callout: "Lorum Ipsum",
              body: "In 2016, artists have produced work urging us to not simply look at painful current events we might rather ignore, but to go further—to imagine a better future. Perhaps the most prominent and controversial has been artist and activist Ai Weiwei, who made the Syrian refugee crisis the subject of his artistic practice this year, even setting up a studio on the Greek island of Lesbos where many come ashore, seeking refuge.\r\n\r\nAi provoked criticism when he posed in a black and white image that showed the artist prostrate on a Turkish beach, his body replacing that of drowned Syrian toddler Aylan Kurdi, who was the subject of a viral news photo. Both detractors and champions of Ai’s rendition shared it widely across social media, and for a brief moment, the all-too-quickly repressed struggle faced by migrants once again made headlines. Ai even brought the crisis to the United States with “Laundromat,” an installation at New York’s Deitch Projects of thousands of pristine and folded garments collected from an abandoned refugee camp. The thesis is simple: if we look, we will act. It goes to show art isn’t simply political—art can change politics.",
              image: "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
              caption: "Installation view of Carrie Mae Weems.",
              image_second: "https://artsy-media-uploads.s3.amazonaws.com/Aw572XiO__5T0T-Tc0j4SA%2FF+Lotus%2C+2016.mp4",
              caption_second: "Lorum Ipsum caption"
            }
          ]
      # benv.render resolve(__dirname, '../../components/eoy/templates/index.jade'), @locals = {
      #   article: @article
      # }, =>
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize EOY feature', ->

    it 'does creates a curation and superarticle', ->
      console.log 'hi'

    # it 'closes all scroller sections'

  # describe '#watchWindow', ->

    # it 'calls trackDirection on scroll', ->
    # it 'calls setupSliderHeight on resize', ->

  # describe '#getScrollZones', ->

    # it 'is an array of 11 items', ->

  # describe '#closestSection', ->

    # it 'returns the section closest to where user scrolls', ->

  # describe '#trackDirection', ->

    # it 'opens the first scroller item when scroll is 0', ->
    # it 'starts the featureslider if in the feature section', ->
    # it 'loads the body and body animations if at the end of scroller', ->

  # describe '#setupSliderHeight', ->

    # it 'gives the feature scroller a height', ->
    # it 'sets the height of the title section', ->
    # it 'fades in the scroller and body', ->

  # describe '#doSlider', ->

    # it 'does stuff to the sections', ->