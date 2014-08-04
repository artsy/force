_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'IntroductionEditView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @user = new CurrentUser fabricate 'user', collector_level: 2
    @IntroductionEditView = benv.requireWithJadeify resolve(__dirname, '../../client/views/introduction_edit'), ['template']
    sinon.stub(Backbone, 'sync').yieldsTo 'success'
    sinon.stub @IntroductionEditView::, 'attachLocationSearch'
    sinon.stub @IntroductionEditView::, 'attachBookmarksView'
    sinon.stub @IntroductionEditView::, 'close'
    sinon.stub(@IntroductionEditView::, 'modalTemplate').returns '<div class="modal-body"></div>'
    @view = new @IntroductionEditView user: @user
    done()

  afterEach ->
    @view.attachLocationSearch.restore()
    @view.attachBookmarksView.restore()
    @view.modalTemplate.restore()
    @view.close.restore()
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$el.html().should.containEql 'Your gallery introduction is the most reliable way to ensure quick and high quality responses on artwork pricing and availability from our partner galleries'

  describe '#postRender', ->
    it 'attaches the location and bookmarks views', ->
      @view.attachLocationSearch.called.should.be.true
      @view.attachBookmarksView.called.should.be.true

  describe '#submit', ->
    it 'saves the user attributes then closes the modal', ->
      @view.$('input[name="name"]').val 'Fifi'
      @view.$('form').submit()
      Backbone.sync.args[0][0].should.equal 'update'
      Backbone.sync.args[0][1].attributes.name.should.equal 'Fifi'
      @view.close.called.should.be.true
