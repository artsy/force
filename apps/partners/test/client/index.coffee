_                   = require 'underscore'
benv                = require 'benv'
sinon               = require 'sinon'
rewire              = require 'rewire'
{ resolve }         = require 'path'
{ fabricate }       = require 'antigravity'
Backbone            = require 'backbone'
CurrentUser         = require '../../../../models/current_user.coffee'
FollowProfileButton = require '../../client/follow_profiles_button.coffee'
FollowProfile       = require '../../../../models/follow_profile.coffee'
FollowProfiles      = require '../../../../collections/follow_profiles.coffee'
Partner             = require '../../../../models/partner.coffee'
Profiles            = require '../../../../collections/profiles.coffee'

describe 'FeaturedPartnersView', ->

  before (done) ->
    sinon.stub _, 'defer'
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()

  beforeEach (done) ->
    @followProfile = new FollowProfile({ id: '111', profile: { id: 'getty' } })
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
      (@view.followProfiles is null).should.be.true

    describe '#initFollowButtons', ->

      it 'creates a follow button view for each profile', ->
        @view.followButtons.should.have.lengthOf @profiles.length

  describe 'with a current user', ->

    beforeEach ->
      sinon.stub CurrentUser, 'orNull', -> new CurrentUser(fabricate('user'))
      @view.initialize()

    afterEach ->
      CurrentUser.orNull.restore()

    describe '#initialize', ->

      it 'creates a follow profiles collection for syncing with the server', ->
        @view.followProfiles.should.be.an.Object

      it 'syncs follow state with the server for rendered profiles', ->
        @profiles.each (profile) ->
          Backbone.sync.args[0][2].data.profiles.should.include profile.get('id')

    describe 'FollowButtonView', ->

      it 'updates button to indicate profiles that are followed', ->
        Backbone.sync.args[0][2].success [ @followProfile.attributes ]
        $profile = @view.$(".follow-button[data-state='following']").closest('.featured-partner-profile')
        $profile.data('profile-id').should.equal @followProfile.get('profile').id
