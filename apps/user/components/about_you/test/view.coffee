benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
UserEdit = require '../../../models/user_edit'
LocationSearchView = benv.requireWithJadeify require.resolve('../../../../../components/location_search/index'), ['template']
AboutYouView = benv.requireWithJadeify require.resolve('../view'), ['template']
AboutYouView.__set__ 'LocationSearchView', LocationSearchView

describe 'AboutYouView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new UserEdit fabricate 'user'
    @view = new AboutYouView model: @user

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders correctly', ->
      html = @view.render().$el.html()
      html.should.containEql 'Information that will give galleries a bit more context about where you are from and what you do.'

  describe '#submit', ->
    it 'saves the attributes on the user', ->
      @view.render()

      @view.$('input[name="profession"]').val 'Foobar'
      @view.$('button').click()
      Backbone.sync.args[0][1].attributes.profession.should.equal 'Foobar'
