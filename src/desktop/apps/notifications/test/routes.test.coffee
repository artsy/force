{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Artist = require '../../../models/artist.coffee'

describe 'Notification Routing', ->

  beforeEach ->
    sinon.stub(Backbone, 'sync').returns('fetchUntilEnd').yieldsTo 'success', []
    @req = { url: '/works-for-you', query: {} }
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals: { sd: { APP_URL: 'http://localhost:5000'} }

  afterEach ->
    Backbone.sync.restore()

  describe '#worksForYou', ->

    it 'redirect to login without a user', ->
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/works-for-you'

    it 'redirects to artist works page without a user, when linked to from email', ->
      @req = { url: '/works-for-you', query: { artist_id: 'percy-the-cat', from_email: true } }
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/artist/percy-the-cat/works?sort=-published_at'

    it 'redirects to login without a user, when not linked to from email', ->
      @req = { url: '/works-for-you', query: { artist_id: 'percy-the-cat' } }
      routes.worksForYou @req, @res
      @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/works-for-you'

    it 'renders with a user and makes fetch for artists and marks/fetches notifications', ->
      @req.user = new CurrentUser fabricate 'user',
        followingArtists: sinon.stub().yieldsTo 'success'
        fetchAndMarkNotifications: sinon.stub().yieldsTo 'success'
        accessToken: 'foo-token'
      routes.worksForYou @req, @res
      Backbone.sync.args[0][2].url.should.containEql '/api/v1/me/follow/artists'
      Backbone.sync.args[0][2].success [fabricate('artist')]
      Backbone.sync.args[1][2].url.should.containEql '/api/v1/me/notifications'
      Backbone.sync.args[1][2].success [fabricate('artwork')]
      _.defer => _.defer =>
        _.defer => _.defer =>
          @res.locals.sd.UNREAD_NOTIFICATIONS.length.should.equal 1
          @res.locals.sd.FOLLOWING.length.should.equal 1
          @res.locals.sd.NOTIFICATION_COUNT?.should.be.false()
          @res.render.args[0][0].should.equal 'index'
