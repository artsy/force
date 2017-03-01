_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
PersonalizeState = require '../../../client/state'
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
      CategoriesView = benv.requireWithJadeify resolve(__dirname, '../../../client/views/categories'), ['template', 'categoryTemplate']
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

  describe '#render', ->
    it 'renders the shell template', ->
      html = @view.$el.html()
      html.should.containEql 'Which categories are you interested in?'
      html.should.containEql 'Follow categories for better artist and artwork recommendations from Artsy.'
      html.should.containEql '<h2>Anything else?</h2>'

  describe '#setupCategories', ->
    it 'sets a gene_id on each category', ->
      @view.categories.first().get('gene_id').should.equal 'a'

  describe '#renderCategories', ->
    it 'it renders the categories given a collection of them and a template key', ->
      @view.renderCategories(@view.categories).
        should.containEql 'class="artsy-primer-personalize-category"'

  describe '#setupFollowButtons', ->
    it 'adds a listener to the follow buttons that sets the skip label', ->
      @view.$('.artsy-primer-personalize-skip').text().should.equal 'Skip'
      @view.$('.follow-button').first().click()
      @view.$('.artsy-primer-personalize-skip').text().should.equal 'Next'

  describe '#followCategory', ->
    it 'should toggle the category follow no matter where in the category a click happens', ->
      $button = @view.$('.follow-button').first()
      $parent = $button.closest('.artsy-primer-personalize-category')
      $parent.click()
      @view.$('.artsy-primer-personalize-skip').text().should.equal 'Next'

  describe '#renderCategories', ->
    beforeEach ->
      @html = @view.$el.html()

    it 'renders the categories', ->
      @html.should.containEql '<h3>A</h3>'
      @html.should.containEql 'data-id="a"'

  describe '#advance', ->
    it 'augments the base #advance by setting user notes', ->
      @view.$('textarea').val myNote = 'I also like cats'
      @view.advance()
      @view.user.get('notes').should.equal myNote
