_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../../models/current_user'
Artist = require '../../../../../models/artist'
FeaturedLink = require '../../../../../models/featured_link'
CategoriesView = null

describe 'CategoriesView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      Backbone.$ = $
      CategoriesView = benv.requireWithJadeify resolve(__dirname, '../../client/views/categories'), ['template', 'categoryTemplate']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @state = new PersonalizeState user: @user
    @view = new CategoriesView state: @state, user: @user
    @geneLink = new FeaturedLink fabricate 'featured_link', href: '/gene/a', title: 'A', image_url: 'a/:version'

    @view.render()
    @view.categories.add @geneLink
    @view.bootstrap()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'fetches the correct set depending on the collector_level of the user (via current_level of state)', ->
      @state.get('current_level').should.equal 2
      _.last(Backbone.sync.args)[1].url().should.containEql '/api/v1/set/53bb0cd872616978b7621200/items'
      @state.set('current_level', 1)
      view = new CategoriesView state: @state, user: @user
      _.last(Backbone.sync.args)[1].url().should.containEql '/api/v1/set/5407293572616943604a0c00/items'
      @state.set('current_level', 3)
      view = new CategoriesView state: @state, user: @user
      _.last(Backbone.sync.args)[1].url().should.containEql '/api/v1/set/53bb0cd872616978b7621200/items'

  describe '#setupCategories', ->
    it 'sets a gene_id on each category', ->
      @view.categories.first().get('gene_id').should.equal 'a'

  describe '#renderCategories', ->
    it 'it renders the categories given a collection of them and a template key', ->
      @view.renderCategories(@view.categories).
        should.containEql 'class="artsy-primer-personalize-category"'

  describe '#renderCategories', ->
    beforeEach ->
      @html = @view.$el.html()

    it 'renders the categories', ->
      @html.should.containEql '<h3>A</h3>'
      @html.should.containEql 'data-id="a"'
