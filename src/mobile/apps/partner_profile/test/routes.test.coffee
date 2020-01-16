_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
routes = require '../routes'
Profile = require '../../../models/profile'
Backbone = require 'backbone'

describe 'Profile page', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the index page passing on the profile and featured show', ->
      routes.index(
        { profile: new Profile(fabricate 'profile', name: 'Foobarz', owner_type: 'PartnerGallery') }
        { locals: { sd: {} }, render: renderStub = sinon.stub() }
      )
      _.last(Backbone.sync.args)[2].success fabricate('partner', id: 'foobar1', displayable_shows_count: 1)
      _.last(Backbone.sync.args)[2].success { results: [] }
      renderStub.args[0][0].should.equal 'index'
      renderStub.args[0][1].profile.get('name').should.equal 'Foobarz'

  describe '#shows', ->

    it 'renders the shows page passing on the current shows, upcoming shows and past shows', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', [ fabricate('show', status: 'running', name: 'Foo') ]
        .returns Promise.resolve [ fabricate('show', status: 'running', name: 'Foo') ]
      Backbone.sync
        .onCall 1
        .yieldsTo 'success', [ fabricate('show', status: 'upcoming', name: 'Meow') ]
        .returns Promise.resolve [ fabricate('show', status: 'upcoming', name: 'Meow') ]
      Backbone.sync
        .onCall 2
        .yieldsTo 'success', [ fabricate('show', status: 'closed', name: 'Bar') ]
        .returns Promise.resolve [ fabricate('show', status: 'closed', name: 'Bar') ]

      renderStub = sinon.stub()
      routes.shows(
        { profile: new Profile(fabricate 'profile', name: 'Foobarz', owner_type: 'PartnerGallery') }
        { render: renderStub }
      ).then ->
        renderStub.args[0][0].should.equal 'shows_page'
        renderStub.args[0][1].profile.get('name').should.equal 'Foobarz'
        renderStub.args[0][1].currentShows.models[0].get('name').should.equal 'Foo'
        renderStub.args[0][1].currentShows.models[1].get('name').should.equal 'Meow'
        renderStub.args[0][1].pastShows.models[0].get('name').should.equal 'Bar'

  describe '#artists', ->

    it 'renders the artists page by passing on the represented/unrep groups', ->
      routes.artists(
        { profile: new Profile(fabricate 'profile', name: 'Foobarz', owner_type: 'PartnerGallery') }
        { render: renderStub = sinon.stub() }
      )
      Backbone.sync.args[0][2].success [
        { artist: fabricate('artist', name: 'Foo'), represented_by: true, image_versions: ['tall'], image_url: '/Foo/bar' }
        { artist: fabricate('artist', name: 'Bar'), represented_by: false }
        { artist: fabricate('artist', name: 'Baz'), represented_by: false, published_artworks_count: 1 }
      ]
      Backbone.sync.args[0][2].success []
      renderStub.args[0][0].should.equal 'artists'
      renderStub.args[0][1].profile.get('name').should.equal 'Foobarz'
      renderStub.args[0][1].represented[0].get('name').should.equal 'Foo'
      renderStub.args[0][1].unrepresented[0].get('name').should.equal 'Baz'

  describe '#contact', ->

    it 'renders the contact page by passing on the partner locations groupped by city', ->
      routes.contact(
        profile: new Profile fabricate('profile'
          name: 'Foobarz'
          owner_type: 'PartnerGallery'
          owner: fabricate('partner'
            id: 'foobarz'
            profile_layout: 'gallery_one'))
        { render: renderStub = sinon.stub() }
      )
      _.last(Backbone.sync.args)[2].success fabricate('partner', id: 'foobar1', displayable_shows_count: 1)
      _.last(Backbone.sync.args)[2].success [
        fabricate('location', city: 'Zoo York')
        fabricate('location', city: 'Zoo York')
        fabricate('location', city: 'Cincinnati')
      ]
      renderStub.args[0][0].should.equal 'contact'
      renderStub.args[0][1].profile.get('name').should.equal 'Foobarz'
      renderStub.args[0][1].locationGroups['Zoo York'].length.should.equal 2

    it 'renders 404 page for non-active partners', ->
      next = sinon.spy()
      renderStub = sinon.stub()

      routes.contact(
        profile: new Profile fabricate('profile'
          name: 'Foobarz'
          owner_type: 'PartnerGallery'
          owner: fabricate('partner'
            id: 'foobarz'
            profile_layout: 'gallery_default'))
        { render: renderStub }
        next
      )

      error = next.getCall(0).args[0]
      error.status.should.equal(404)
      error.message.should.equal('Not Found')

  describe '#fetchArtworksAndRender', ->

    xit 'renders the partner\'s works based on parameters', ->
      routes.fetchArtworksAndRender(
        {
          label: "Works",
          profile: new Profile(fabricate 'profile', name: 'Foobarz', owner_type: 'PartnerInstitution')
        }
        { render: renderStub = sinon.stub() }
      )
      Backbone.sync.args[0][2].success [
        [fabricate('artwork')]
      ]
      renderStub.args[0][0].should.equal 'contact'
      renderStub.args[0][1].profile.get('name').should.equal 'Foobarz'
      renderStub.args[0][1].locationGroups['Zoo York'].length.should.equal 2

