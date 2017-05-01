_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../../../models/article'
Curation = require '../../../../../models/curation.coffee'
{ resolve } = require 'path'

describe 'Venice Main', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        window:
          history: replaceState: @replaceState = sinon.stub()
          scrollTo: @scrollTo = sinon.stub()
          innerHeight: 900
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
            video_url_adaptive: '/vanity/url.mpd'
            slug: 'slug-one'
            artist_ids: []
          },
          {
            description: 'description2'
            cover_image: ''
            video_url: '/vanity/url2.mp4'
            video_url_medium: '/vanity/url2-medium.mp4'
            video_url_adaptive: '/vanity/url2.mpd'
            slug: 'slug-two'
            published: true
            artist_ids: []
          },
          {
            description: 'description2'
            cover_image: ''
            video_url: '/vanity/url3.mp4'
            video_url_medium: '/vanity/url3-medium.mp4'
            video_url_adaptive: '/vanity/url3.mpd'
            slug: 'slug-three'
            published: true
            artist_ids: []
          }
        ]
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
        videoIndex: 0
        curation: new Curation @curation
        videoGuide: new Article {id: '123', title: 'Video Guide'}
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        VeniceView = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/client/index'), ['videoDescription']
        VeniceView.__set__ 'sd',
          APP_URL: 'localhost'
          VIDEO_INDEX: 0
          CURATION: @curation
        VeniceView.__set__ 'VeniceVideoView', @VeniceVideoView = sinon.stub().returns
          vrView:
            play: @play = sinon.stub()
            pause: @pause = sinon.stub()
          trigger: sinon.stub()
        VeniceView.__set__ 'initCarousel', @initCarousel = sinon.stub().yields
          cells: flickity:
            on: @on = sinon.stub()
            selectedIndex: 1
            select: sinon.stub()
            next: sinon.stub()
        @view = new VeniceView
          el: $('body')
        done()

  afterEach ->
    benv.teardown()

  it 'initializes VeniceVideoView', ->
    @VeniceVideoView.args[0][0].el.selector.should.equal '.venice-video'
    @VeniceVideoView.args[0][0].video.should.equal 'localhost/vanity/url.mp4'

  it 'sets up the carousel', ->
    @initCarousel.args[0][0].selector.should.equal '.venice-carousel'
    @initCarousel.args[0][1].advanceBy.should.equal 1
    @initCarousel.args[0][1].wrapAround.should.be.true()
    @initCarousel.args[0][1].initialIndex.should.equal 0

  it 'changes the section when flickity has settled #settleSection', ->
    @on.args[0][1]()
    @on.args[0][0].should.equal 'settle'
    @view.VeniceVideoView.trigger.args[0][0].should.equal 'swapVideo'
    @view.VeniceVideoView.trigger.args[0][1].video.should.equal 'localhost/vanity/url2.mp4'

  it 'changes the section when flickity item has been selected #selectSection', ->
    @on.args[1][1]()
    @on.args[1][0].should.equal 'select'
    @replaceState.args[0][1].should.equal 1
    @replaceState.args[0][2].should.equal '/venice-biennale/slug-two'
    $('.venice-overlay__play').attr('data-state').should.equal 'loading'

  it '#fadeOutCoverAndStartVideo does not play if it is not ready', ->
    $('.venice-overlay__play').click()
    @play.callCount.should.equal 0

  it '#fadeOutCoverAndStartVideo', ->
    $('.venice-overlay__play').first().attr 'data-state', 'ready'
    $('.venice-overlay__play').first().click()
    @play.callCount.should.equal 1

  it '#fadeInCoverAndPauseVideo', ->
    @view.fadeInCoverAndPauseVideo()
    @pause.callCount.should.equal 1

  it '#onVideoReady', ->
    @view.onVideoReady()
    $('.venice-overlay__play').attr('data-state').should.equal 'ready'

  it 'chooses a medium quality mp4 video for iOS', ->
    @view.parser = getOS: sinon.stub().returns name: 'iOS'
    @view.chooseVideoFile().should.equal 'localhost/vanity/url-medium.mp4'

  it 'chooses an adaptive video for mobile', ->
    @view.parser =
      getOS: sinon.stub().returns name: 'Android'
      getDevice: sinon.stub().returns type: 'mobile'
    @view.chooseVideoFile().should.equal 'localhost/vanity/url.mpd'

  it 'chooses a high quality video for desktop', ->
    @view.parser =
      getOS: sinon.stub().returns name: 'Mac OS'
      getDevice: sinon.stub().returns type: null
    @view.chooseVideoFile().should.equal 'localhost/vanity/url.mp4'

  it '#onVideoCompleted fades out the video player and displays completed cover', ->
    @view.fadeInCoverAndPauseVideo = sinon.stub()
    @view.onVideoCompleted()
    @view.fadeInCoverAndPauseVideo.callCount.should.eql 1

  it '#onNextVideo advances the carousel to the next slide', ->
    @view.onVideoCompleted()
    $('.venice-overlay--completed .next')[0].click()
    @view.flickity.next.args[0][0].should.be.true()
    @view.flickity.next.callCount.should.equal 1

  it '#onReadMore scrolls to the video description and hides completed cover (read-more)', ->
    @view.onVideoCompleted()
    $('.venice-overlay--completed .read-more').click()
    @scrollTo.args[0][1].should.eql 900

  it '#onReadMore scrolls to the video description and hides completed cover (info icon)', ->
    @view.onVideoCompleted()
    $('.venice-info-icon').click()
    @scrollTo.args[0][1].should.eql 900

  it '#showCta reveals a signup form', ->
    $('.venice-overlay__cta-button').click()
    $('.venice-overlay__subscribe-form').css('opacity').should.eql '1'

  it '#onSubscribe', ->
    $('.venice-overlay__cta-button').click()
    $('.venice-overlay__subscribe-form input').val('email@email.com')
    $('.venice-overlay__subscribe-form button').click()
    $('.venice-overlay__cta-button').css('opacity').should.not.eql '0'
