benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
CurrentUser = require '../../../../../models/current_user'

describe 'LocationModalView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $

      @LocationModalView = benv.requireWithJadeify resolve(__dirname, '../index'), ['template']
      @LocationModalView.__set__ 'LocationSearchView', Backbone.View
      sinon.stub(@LocationModalView::, 'modalTemplate').returns('<div class="modal-body"></div>')

      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @LocationModalView user: new CurrentUser

  afterEach ->
    Backbone.sync.restore()

  it 'requires a user model', ->
    (=> new @LocationModalView).should.throw /Requires a user model/

  it 'renders the template', ->
    html = @view.$el.html()
    html.should.containEql 'Where do you call home?'
    html.should.containEql 'See top galleries near you'
    html.should.containEql 'Continue'

  it 'listens to location update and updates the user', ->
    @view.user.setLocation = sinon.stub()
    @view.locationSearchView.trigger 'location:update', sinon.stub()
    @view.user.setLocation.called.should.be.true
    Backbone.sync.called.should.be.true
    Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
    @view.$('button').data('state').should.equal 'loading'
    @view.$('button').prop('disabled').should.be.true
