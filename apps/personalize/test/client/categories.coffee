_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
{ fabricate }     = require 'antigravity'
{ resolve }       = require 'path'
PersonalizeState  = require '../../client/state'
CurrentUser       = require '../../../../models/current_user'
Artist            = require '../../../../models/artist'
FeaturedLink      = require '../../../../models/featured_link'

CategoriesView = benv.requireWithJadeify resolve(__dirname, '../../client/views/categories'), ['template', 'suggestionTemplates.featured', 'suggestionTemplates.secondary']
CategoriesView.__set__ 'OrderedSets', Backbone.Collection
CategoriesView.__get__('OrderedSets')::fetchAll = sinon.stub()

describe 'CategoriesView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user       = new CurrentUser fabricate 'user'
    @state      = new PersonalizeState user: @user
    @view       = new CategoriesView state: @state, user: @user
    @geneLinkA  = new FeaturedLink fabricate 'featured_link', href: '/gene/a', title: 'A', image_url: 'a/:version'
    @geneLinkB  = new FeaturedLink fabricate 'featured_link', href: '/gene/b', title: 'B', image_url: 'b/:version'

    @view.render()
    @view.categories.featured.first().set items: new Backbone.Collection [@geneLinkA]
    @view.categories.secondary.first().set items: new Backbone.Collection [@geneLinkB]
    @view.bootstrap()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the shell template', ->
      html = @view.$el.html()
      html.should.include 'Which categories are you interested in?'
      html.should.include 'Follow categories for better artist and artwork recommendations from Artsy.'
      html.should.include '<h2>Anything else?</h2>'

  describe '#setupCategories', ->
    it 'sets a gene_id on each category', ->
      @view.categories.featured.first().get('gene_id').should.equal 'a'
      @view.categories.secondary.first().get('gene_id').should.equal 'b'

  describe '#renderCategories', ->
    it 'it renders the categories given a collection of them and a template key', ->
      @view.renderCategories(@view.categories.featured, 'featured').
        should.include 'class="personalize-category"'
      @view.renderCategories(@view.categories.featured, 'secondary').
        should.include 'class="personalize-secondary-category"'

  describe '#setupFollowButtons', ->
    it 'adds a listener to the follow buttons that sets the skip label', ->
      @view.$('.personalize-skip').text().should.equal 'Skip'
      @view.$('.follow-button').first().click()
      @view.$('.personalize-skip').text().should.equal 'Next'

  describe '#followCategory', ->
    it 'should toggle the category follow no matter where in the category a click happens', ->
      $button   = @view.$('.follow-button').first()
      $parent   = $button.closest('.personalize-category')
      $parent.click()
      @view.$('.personalize-skip').text().should.equal 'Next'

  describe '#renderCategories', ->
    beforeEach ->
      @html = @view.$el.html()
    it 'renders the featured categories', ->
      @html.should.include 'src="a/original'
      @html.should.include '<h3>A</h3>'
      @html.should.include 'data-id="a"'

    it 'renders the secondary categories', ->
      @html.should.include 'src="b/original'
      @html.should.include '<h3>B</h3>'
      @html.should.include 'data-id="b"'

  describe '#advance', ->
    it 'augments the base #advance by setting user notes', ->
      @view.$('textarea').val myNote = 'I also like cats'
      @view.advance()
      @view.user.get('notes').should.equal myNote
