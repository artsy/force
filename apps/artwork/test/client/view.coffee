_               = require 'underscore'
rewire          = require 'rewire'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Artist        = require '../../../../models/artist'
Artwork       = require '../../../../models/artwork'
CurrentUser   = require '../../../../models/current_user'

describe 'ArtworkView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.support.transition = { end: 'transitionend' }
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artist = new Artist(fabricate 'artist')

    # Interestingly: jQuery "Every attempt is made to convert the string to a
    # JavaScript value (this includes booleans, numbers, objects, arrays, and null)"
    # and we're using numeric-looking strings for fabricated artwork image IDs.
    _.each (artworkJson = fabricate('artwork')).images, (image) ->
      image.id = _.uniqueId('stringy')
    @artwork = new Artwork(artworkJson, parse: true)

    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd: {}
      artist: @artist
      artwork: @artwork
    }, =>
      @ArtworkView = rewire '../../client/view'
      @ArtworkView.__set__ 'ShareView', (@shareViewStub = sinon.stub())
      done()

  afterEach ->
    Backbone.sync.restore()

  describe 'user logged in', ->
    beforeEach ->
      @ArtworkView.__set__ 'CurrentUser', { orNull: -> new CurrentUser(fabricate 'user') }
      @view = new @ArtworkView el: $('#artwork-page'), artist: @artist, artwork: @artwork

    describe '#initialize', ->
      it 'has an artist and an artwork', ->
        @view.artwork.id.should.equal @artwork.id
        @view.artist.id.should.equal @artist.id

      it 'has a following collection if the user is logged in', ->
        _.isUndefined(@view.following).should.not.be.ok

    describe '#openShare', ->
      it 'opens the share view when the share button is clicked', ->
        @view.$('.circle-icon-button-share').click()
        @shareViewStub.args[0][0].artwork.id.should.equal @artwork.id
        @shareViewStub.args[0][0].width.should.equal '350px'

    describe '#route', ->
      it 'transitions the state of the el with data attributes', ->
        @view.$el.attr('data-route').should.equal 'show'
        @view.route('more-info')
        @view.$el.attr('data-route-pending').should.equal 'more-info'
        @view.$el.attr('data-route').should.equal 'more-info'

    describe '#changeImage', ->
      beforeEach ->
        @$imageLink = @view.$('.artwork-additional-image.is-inactive').first()
        # The artwork images are fabricated with identical links
        # so lets change that
        @$imageLink.data('href', 'foobar')
        @$imageLink.click()

      it 'changes the primary image src', ->
        @view.$('#the-artwork-image').attr('src').
          should.equal 'foobar'

      it 'changes the activeImage on the artwork model', ->
        @view.artwork.activeImage().id.should.equal @$imageLink.data('id')

      it 'sets the class of the clicked link to is-active', ->
        @$imageLink.hasClass('is-active').should.be.ok

    describe '#setupFollowButton', ->
      it 'syncs the following collection with the artist id', ->
        syncFollowsSpy = sinon.spy @view.following, 'syncFollows'
        @view.setupFollowButton()
        syncFollowsSpy.args[0][0].should.include @artist.id

  describe 'user logged out', ->
    beforeEach ->
      @ArtworkView.__set__ 'CurrentUser', { orNull: -> null }
      @view = new @ArtworkView el: $('#artwork-page'), artist: @artist, artwork: @artwork

    describe '#initialize', ->
      it 'does not have a following collection if the user is not logged in', ->
        _.isUndefined(@view.following).should.be.ok
