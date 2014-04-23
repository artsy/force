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

CategoriesView = benv.requireWithJadeify resolve(__dirname, '../../client/views/categories'), ['template', 'suggestedCategoriesTemplate']
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

    @state      = new PersonalizeState
    @user       = new CurrentUser fabricate 'user'
    @view       = new CategoriesView state: @state, user: @user
    @geneLink   = new FeaturedLink fabricate 'featured_link', href: '/gene/whatever', title: 'Whatever', subtitle: 'A gene about nothing', image_url: 'whatever/:version'

    @view.render()
    @view.categories.first().set items: new Backbone.Collection [@geneLink]
    @view.categories.trigger 'sync:complete'

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the shell template', ->
      html = @view.$el.html()
      html.should.include 'Which categories are you interested in?'
      html.should.include 'Below are popular categories on Artsy'

  describe '#setupCategories', ->
    it 'sets a gene_id on each category', ->
      @view.categories.first().get('gene_id').should.equal 'whatever'

  describe '#setupFollowButtons', ->
    it 'adds a listener to the follow buttons that sets the skip label', ->
      @view.$('.personalize-skip').text().should.equal 'Skip'
      @view.$('.follow-button').first().click()
      @view.$('.personalize-skip').text().should.equal 'Next'

  describe '#renderCategories', ->
    it 'renders the categories', ->
      html = @view.$el.html()
      html.should.include 'src="whatever/original'
      html.should.include '<h3>Whatever</h3>'
      html.should.include '<aside>A gene about nothing</aside>'
      html.should.include 'data-id="whatever"'
      html.should.include '<h2>Anything else?</h2>'

  describe '#advance', ->
    it 'augments the base #advance by setting user notes', ->
      @view.$('textarea').val myNote = 'I also like cats'
      @view.advance()
      @view.user.get('notes').should.equal myNote
