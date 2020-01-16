_ = require 'underscore'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
{ fabricate } = require '@artsy/antigravity'
cheerio = require 'cheerio'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'For You View', ->

  beforeEach (done) ->
    @user = new CurrentUser fabricate 'user', id: 'current-user-id'
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.onInfiniteScroll = ->
      sinon.stub(CurrentUser, 'orNull').returns @user
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/for_you.jade'), {
        fair: @fair = new Fair(fabricate 'fair')
        profile: @profile = new Profile(fabricate 'fair_profile')
        sd: {}
      }, =>
        { ForYouView } = require '../../client/for_you'
        @view = new ForYouView
          el: $ '#fair-for-you'
          fair: @fair
          profile: @profile
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()
    CurrentUser.orNull.restore()

  describe 'init code', ->

    it 'creates a for you fair page view', ->
      @view.$('#fair-page-title').text().should.containEql 'Guide'

  xdescribe 'logged out / not many follows', ->

    xit 'renders exhibitors to follow', ->

  describe 'logged in', ->

    describe '#updateAndShowTitle', ->

      it "renders the user's name in the heading", ->
        @view.$('#fair-page-title').text().should.containEql @user.get('name')

    describe '#fetchFollowingExhibitors', ->

      it "renders fair exhibitor booths of partner profiles the current user follows", ->
        Backbone.sync.args[0][2].url.should.containEql 'me/follow/profiles'
        Backbone.sync.args[0][2].data.fair_id.should.equal @fair.get('id')
        #Backbone.sync.args[0][2].success({results: [fabricate('partner_profile')]})
        #Backbone.sync.args[0][2].success([])

    xdescribe '#fetchFollowingArtists', ->

      it "renders links to booths of artists the current user follows", ->
