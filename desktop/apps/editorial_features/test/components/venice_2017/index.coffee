_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Curation = require '../../../../../models/curation.coffee'
{ resolve } = require 'path'

describe 'Venice Main', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        window: history: replaceState: @replaceState = sinon.stub()
        moment: require 'moment'
      Backbone.$ = $
      @curation =
        description: 'description'
        sub_articles: []
        sections: [
          {
            description: 'description'
            cover_image: ''
            video_url: '/vanity/url.mp4'
            video_url_medium: '/vanity/url-medium.mp4'
            video_url_hls: '/vanity/url.m3u8'
            slug: 'slug-one'
            artist_ids: []
          },
          {
            description: 'description2'
            cover_image: ''
            video_url: '/vanity/url2.mp4'
            video_url_medium: '/vanity/url2-medium.mp4'
            video_url_hls: '/vanity/url2.m3u8'
            slug: 'slug-two'
            published: true
            artist_ids: []
          }
        ]
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
        videoIndex: 0
        curation: new Curation @curation
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        VeniceView = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/client/index'), ['videoDescription']
        VeniceView.__set__ 'sd',
          APP_URL: 'localhost'
          VIDEO_INDEX: 0
          CURATION: @curation
        VeniceView.__set__ 'VeniceVideoView', @VeniceVideoView = sinon.stub().returns
          vrView: play: @play = sinon.stub()
          trigger: sinon.stub()
        VeniceView.__set__ 'initCarousel', @initCarousel = sinon.stub().yields
          cells: flickity:
            on: @on = sinon.stub()
            selectedIndex: 1
        @view = new VeniceView
          el: $('body')
        done()

  after ->
    benv.teardown()

  it 'initializes VeniceVideoView', ->
    @VeniceVideoView.args[0][0].el.selector.should.equal '.venice-video'
    @VeniceVideoView.args[0][0].video.should.equal 'localhost/vanity/url.mp4'

  it 'sets up the carousel', ->
    @initCarousel.args[0][0].selector.should.equal '.venice-carousel'
    @initCarousel.args[0][1].imagesLoaded.should.be.true()
    @initCarousel.args[0][1].advanceBy.should.equal 1
    @initCarousel.args[0][1].wrapAround.should.be.true()
    @initCarousel.args[0][1].initialIndex.should.equal 0

  it 'changes the section when a new carousel item is selected', ->
    @on.args[0][1]()
    @replaceState.args[0][1].should.equal 1
    @replaceState.args[0][2].should.equal '/venice-biennale/slug-two'
    @view.VeniceVideoView.trigger.args[0][0].should.equal 'swapVideo'
    @view.VeniceVideoView.trigger.args[0][1].video.should.equal 'localhost/vanity/url2.mp4'

  it '#fadeOutCoverAndStartVideo', ->
    $('.venice-overlay__play').click()
    @play.callCount.should.equal 1

  it 'chooses an hls video for Safari', ->
    @view.parser = getBrowser: sinon.stub().returns name: 'Safari'
    @view.chooseVideoFile().should.equal 'localhost/vanity/url2.m3u8'

  it 'chooses a medium quality video for mobile', ->
    @view.parser =
      getBrowser: sinon.stub().returns name: 'Chrome'
      getDevice: sinon.stub().returns type: 'mobile'
    @view.chooseVideoFile().should.equal 'localhost/vanity/url2-medium.mp4'

  it 'chooses a high quality video as a default', ->
    @view.parser =
      getBrowser: sinon.stub().returns name: 'Chrome'
      getDevice: sinon.stub().returns type: 'desktop'
    @view.chooseVideoFile().should.equal 'localhost/vanity/url2.mp4'

  it '#showCta reveals a signup form', ->
    $('.venice-overlay__cta-button').click()
    $('.venice-overlay__subscribe-form').css('opacity').should.eql '1'

  it '#onSubscribe', ->
    $('.venice-overlay__cta-button').click()
    $('.venice-overlay__subscribe-form input').val('email@email.com')
    $('.venice-overlay__subscribe-form button').click()
    $('.venice-overlay__cta-button').css('opacity').should.not.eql '0'
