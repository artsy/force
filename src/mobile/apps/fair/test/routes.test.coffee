_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
routes = require '../routes'
Backbone = require 'backbone'
Profile = require '../../../models/profile'
Fair = require '../../../models/fair'
Show = require '../../../models/show'

describe 'vanity routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'require a profile of the fair organizer or fair type or goes to the next route', ->
    spy = sinon.spy()
    req = { params: {}, profile: new Profile(fabricate 'profile', owner_type: 'User') }
    routes.mainPage req, {}, spy
    routes.exhibitors req, {}, spy
    routes.artworks req, {}, spy
    spy.callCount.should.equal 3

  it 'does not go to the next route if the profile owner is a fair', ->
    routes.mainPage { params: { id: 'foo-fair' }, profile: new Profile fabricate('profile', owner_type: 'Fair') },
      { locals: { sd: {} }, render: renderStub = sinon.stub() }
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    renderStub.args[0][0].should.equal 'main_page'
    renderStub.args[0][1].fair.get('name').should.equal 'Foo Fair'

describe '#mainPage', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the main page', ->
    routes.mainPage { params: { id: 'foo-fair' }, profile: new Profile fabricate('profile', owner_type: 'Fair') },
      { locals: { sd: {} }, render: renderStub = sinon.stub() }
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    renderStub.args[0][0].should.equal 'main_page'
    renderStub.args[0][1].fair.get('name').should.equal 'Foo Fair'

describe '#exhibitors', ->

  beforeEach ->
    @req = { params: { id: 'foo-fair' }, profile: new Profile fabricate('profile', owner_type: 'Fair') }
    @res = { locals: { sd: {} }, render: sinon.stub() }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the exhibitors page', ->
    routes.exhibitors @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    Backbone.sync.args[1][2].success results: [
      fabricate('show', fair_location: { display: 'booth 20' })
    ]
    @res.render.args[0][0].should.equal 'exhibitors_page'
    @res.render.args[0][1].shows.first().formattedLocation().should.equal 'booth 20'

  it 'sets the title to "Exhibitors a {section}" if a section param', ->
    @req.params.section = 'Pier 9'
    routes.exhibitors @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    Backbone.sync.args[1][2].data.section.should.equal 'Pier 9'
    Backbone.sync.args[1][2].success results: [
      fabricate('show', fair_location: { display: 'booth 20' })
    ]
    @res.render.args[0][1].title.should.equal "Exhibitors at Pier 9"

  it 'sets the title to "{Artist Name}" if a artist param', ->
    @req.params.artistId = 'andy-foobar'
    routes.exhibitors @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    Backbone.sync.args[1][2].success results: [
      fabricate 'show',
        artworks: [
          fabricate 'artwork',
            artist: fabricate('artist', name: 'Andy Foobar')
        ]
    ]
    @res.render.args[0][1].title.should.equal "Andy Foobar"

  it 'scopes by partner if passed a partner param', ->
    @req.params.partnerId = 'the-big-gago'
    routes.exhibitors @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    Backbone.sync.args[1][2].data.partner.should.equal 'the-big-gago'
    Backbone.sync.args[1][2].success results: [
      fabricate('show', fair_location: { display: 'booth 20' })
    ]
    @res.render.args[0][1].showParams.partner.should.equal "the-big-gago"

  it 'scopes by artist if passed a partner param', ->
    @req.params.artistId = 'andy-foobar'
    routes.exhibitors @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    Backbone.sync.args[1][2].data.artist.should.equal 'andy-foobar'

  it 'is fine when there is bad data and the API returns no shows', ->
    routes.exhibitors @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    Backbone.sync.args[0][2].success results: []

describe '#artworks', ->

  beforeEach ->
    @req =
      params: { id: 'foo-fair'}
      profile: new Profile fabricate('profile', owner_type: 'Fair', owner: { default_fair_id: 'armory-show' })
    @res = { locals: { sd: {} }, render: sinon.stub() }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the artwork page', ->
    @req.query = foo: "bar"
    routes.artworks @req, @res
    Backbone.sync.args[0][2].success fabricate 'fair'
    @res.render.args[0][0].should.equal 'artworks'

describe '#info', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the info page', ->
    routes.info { params: { id: 'foo-fair' }, profile: new Profile fabricate('profile', owner_type: 'Fair') },
      { render: renderStub = sinon.stub() }
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    renderStub.args[0][0].should.equal 'info'
    renderStub.args[0][1].fair.get('name').should.equal 'Foo Fair'

describe '#trending', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  it 'renders the trending page', ->
    routes.trending { params: { id: 'foo-fair' }, profile: new Profile fabricate('profile', owner_type: 'Fair') },
      { render: renderStub = sinon.stub(), locals: { sd: {} } }
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair'
    renderStub.args[0][0].should.equal 'trending'
    renderStub.args[0][1].fair.get('name').should.equal 'Foo Fair'

describe '#showRedirect', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @partner = new Profile fabricate 'partner'
    @res = { backboneError: sinon.stub(), redirect: sinon.stub() }

    fairOrg = new Profile fabricate('profile', owner_type: 'Fair')
    fair = new Fair fabricate 'fair'

    fairOrg.set 'owner', fair.attributes

    @req =
      params:
        id: 'foo-fair'
        partnerId: @partner.get('id')
      profile: fairOrg

  afterEach ->
    Backbone.sync.restore()

  it 'redirects to show page', ->
    routes.showRedirect @req, @res
    show = fabricate 'show'

    Backbone.sync.args[0][1].url.should.containEql 'fair/armory-show-2013/shows'
    Backbone.sync.args[0][2].data.partner.should.equal @partner.get('id')
    Backbone.sync.args[0][2].success { results: [show] }
    @res.redirect.args[0][0].should.containEql (new Show(show)).href()

describe '#search', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @res = { backboneError: sinon.stub(), redirect: sinon.stub(), render: sinon.stub() }

  afterEach ->
    Backbone.sync.restore()

  it 'searches', ->
    req = { query: { term: 'bitty' }, params: { id: 'foo-fair' }, profile: new Profile fabricate('profile', owner_type: 'Fair') }
    routes.search req, @res
    Backbone.sync.args[0][2].success fabricate 'fair', name: 'Foo Fair', id: 'percy'
    Backbone.sync.args[1][2].data.term.should.equal 'bitty'
    Backbone.sync.args[1][2].data.fair_id.should.equal 'percy'
    Backbone.sync.args[2][2].data.term.should.equal 'bitty'

  it 'redirects without query', ->
    req = { params: { id: 'bitty' }, profile: new Profile fabricate('profile', owner_type: 'Fair', owner: { default_fair_id: 'bitty' }) }
    routes.search req, @res
    @res.redirect.args[0][0].should.equal '/bitty'
