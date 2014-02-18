_               = require 'underscore'
sd              = require('sharify').data
benv            = require 'benv'
sinon           = require 'sinon'
rewire          = require 'rewire'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'
Backbone        = require 'backbone'
CurrentUser     = require '../../../../models/current_user.coffee'
Follow          = require '../../../../components/follow_button/model.coffee'
Partner         = require '../../../../models/partner.coffee'
Profiles        = require '../../../../collections/profiles.coffee'

describe 'FeaturedPartnersView', ->
  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: require('jquery')(window) }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach (done) ->
    @follow = new Follow({ id: '111', profile: { id: 'getty' } })
    @profiles = new Profiles [
      fabricate('featured_partners_profiles',
        id: 'gagosian'
        owner: new Partner(fabricate('partner',
          type: "Gallery"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
      fabricate('featured_partners_profiles',
        id: 'getty'
        owner: new Partner(fabricate('partner',
          type: "Museum"
          name: "J. Paul Getty Museum"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
      fabricate('featured_partners_profiles',
        id: 'lacma'
        owner: new Partner(fabricate('partner',
          type: "Museum"
          name: "LACMA"
          locations: new Backbone.Collection([fabricate('location')])
        ))
      )
    ]
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../template.jade'), {
      sd: {}
      featuredPartnerProfiles: @profiles
    }, =>
      { FeaturedPartnersView } = mod = rewire '../../client/index'
      @view = new FeaturedPartnersView
        collection: @profiles
        el: $ '#featured-partners'
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    beforeEach ->
      @view.initialize()

    it 'has a collection of profiles', ->
      @view.collection.should.equal @profiles

    it 'does not have a follow profiles collection', ->
      _.isUndefined(@view.following).should.be.true

    describe '#initFollowButtons', ->
      it 'creates a follow button view for each profile', ->
        @view.followButtons.should.have.lengthOf @profiles.length

  describe 'with a current user', ->
    beforeEach ->
      sd.CURRENT_USER = 'existy'
      @view.initialize()

    afterEach ->
      delete sd.CURRENT_USER

    describe '#initialize', ->
      it 'creates a follow profiles collection for syncing with the server', ->
        @view.following.should.be.an.Object

      it 'syncs follow state with the server for rendered profiles', ->
        @profiles.each (profile) ->
          Backbone.sync.args[0][2].data.profiles.should.include profile.get('id')

    describe 'FollowButtonView', ->
      it 'updates button to indicate profiles that are followed', ->
        Backbone.sync.args[0][2].success [ @follow.attributes ]
        $profile = @view.$(".follow-button[data-state='following']").closest('.featured-partner-profile')
        $profile.data('profile-id').should.equal @follow.get('profile').id
