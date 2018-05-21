_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../../../models/article'
Curation = require '../../../../../models/curation.coffee'
{ resolve } = require 'path'
markdown = require '../../../../../components/util/markdown.coffee'

describe 'Venice Main', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        window:
          history: replaceState: @replaceState = sinon.stub()
          innerHeight: 900
        moment: require 'moment'
        markdown: markdown
        crop: crop = sinon.stub().returns 'http://artsy.net/image.jpg'
      Backbone.$ = $
      $.fn.fadeOut = @fadeOut = sinon.stub()
      @animateSpy = sinon.spy $.fn, 'animate'
      @curation =
        description: 'description'
        sub_articles: [{thumbnail_title:{'Sub 1'}, thumbnail_image: 'http://artsy.net/image.jpg'}, {thumbnail_title:{'Sub 2'}, thumbnail_image: 'http://artsy.net/image2.jpg'}]
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
        sub_articles: [{title:{'Sub 1'}, thumbnail_image: 'http://artsy.net/image.jpg'}, {title:{'Sub 2'}, thumbnail_image: 'http://artsy.net/image2.jpg'}]
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
          fadeOutControls: sinon.stub()
        VeniceView.__set__ 'initCarousel', @initCarousel = sinon.stub().yields
          cells: flickity:
            on: @on = sinon.stub()
            selectedIndex: 1
            select: sinon.stub()
            next: sinon.stub()
        VeniceView.__set__ 'initFooterCarousel', @initFooterCarousel = sinon.stub()
        VeniceView.__set__ 'FlashMessage', sinon.stub()
        @view = new VeniceView
          el: $('body')
        done()

  afterEach ->
    @animateSpy.restore()
    benv.teardown()

  it 'initializes VeniceVideoView', ->
    @VeniceVideoView.args[0][0].el.attr('class').should.equal 'venice-video'
    @VeniceVideoView.args[0][0].video.should.equal 'localhost/vanity/url.mp4'

  it 'sets up the carousel', ->
    @initCarousel.args[0][0].attr('class').should.equal 'venice-carousel'
    @initCarousel.args[0][1].advanceBy.should.equal 1
    @initCarousel.args[0][1].wrapAround.should.be.true()
    @initCarousel.args[0][1].initialIndex.should.equal 0
    @initCarousel.args[0][2](cells: flickity: on: ->)
    @fadeOut.callCount.should.equal 2

  it 'Sets up the footer carousel', ->
    $(@view.el).find('.venice-footer').html().should.containEql '<h2 class="title">The Venice Biennale</h2>'
    $(@view.el).find('.venice-footer .mgr-cell').length.should.eql 2
    $(@view.el).find('.venice-footer .mgr-cells').html().should.containEql '<img src="http://artsy.net/image.jpg">'

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
    @view.VeniceVideoView.fadeOutControls.callCount.should.equal 1

  it 'fades out controls after pressing play on mobile', ->
    $('.venice-overlay__play').first().attr 'data-state', 'ready'
    @view.parser =
      getDevice: sinon.stub().returns type: 'mobile'
    $('.venice-overlay__play').first().click()
    @view.VeniceVideoView.fadeOutControls.callCount.should.equal 1

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
    @animateSpy.args[1][0].opacity.should.eql 0
    @animateSpy.args[1][0]['z-index'].should.eql -1
    @animateSpy.args[2][0].scrollTop.should.eql 900

  it '#onReadMore scrolls to the video description and hides completed cover (info icon)', ->
    @view.onVideoCompleted()
    $('.venice-info-icon').click()
    @animateSpy.args[1][0].opacity.should.eql 0
    @animateSpy.args[1][0]['z-index'].should.eql -1
    @animateSpy.args[2][0].scrollTop.should.eql 900

  it '#showCta reveals a signup form', ->
    $('.venice-overlay__cta-button').click()
    $('.venice-overlay__subscribe-form').css('opacity').should.eql '1'

  it '#onSubscribe', ->
    $('.venice-overlay__cta-button').click()
    $('.venice-overlay__subscribe-form input').val('email@email.com')
    $('.venice-overlay__subscribe-form button').click()
    $('.venice-overlay__cta-button').css('opacity').should.not.eql '0'

  it 'displays an error if there is one', ->
    @view.onVideoError 'Sorry, your browser is not supported.'
    $('.venice-overlay__play').attr('data-state').should.equal 'error'
    $('.venice-overlay__error').html().should.equal 'Sorry, your browser is not supported.'

describe 'VeniceView isSubscribed', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        window:
          history: replaceState: @replaceState = sinon.stub()
          innerHeight: 900
        moment: require 'moment'
        markdown: markdown
        crop: sinon.stub().returns 'http://artsy.net/image.jpg'
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
          }
        ]
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
        videoIndex: 0
        curation: new Curation @curation
        videoGuide: new Article {id: '123', title: 'Video Guide'}
        isSubscribed: true
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

  it 'Hides the subscribe to editorial form if user is subscribed', ->
    $('.venice-overlay__subscribe-form').length.should.eql 0
