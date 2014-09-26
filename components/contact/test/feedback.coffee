_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'FeedbackView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../templates/index.jade'), {}, =>
      FeedbackView = benv.requireWithJadeify(resolve(__dirname, '../feedback'), ['formTemplate', 'headerTemplate'])
      sinon.stub FeedbackView::, 'open'
      sinon.stub FeedbackView::, 'updatePosition'
      @view = new FeedbackView el: $('body')
      @view.representatives = new Backbone.Collection [name: 'Foo Bar']
      @view.representatives.first().iconImageUrl = sinon.stub()
      @view.renderTemplates()
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#renderTemplates', ->
    it 'renders correctly', ->
      html = @view.$el.html()
      html.should.containEql 'Send feedback to Artsy'
      html.should.containEql 'img alt="Foo Bar"'

  describe '#submit', ->
    describe 'Logged out', ->
      beforeEach ->
        @view.$('input[name="user_name"]').val('Foo Bar')
        @view.$('input[name="user_email"]').val('foo@bar.com')
        @view.$('textarea[name="message"]').val('My message')
        @view.$('form').submit()

      it 'POSTs to the correct endpoint', ->
        _.last(Backbone.sync.args)[0].should.equal 'create'
        _.last(Backbone.sync.args)[1].url.should.containEql 'api/v1/feedback'

      it 'sends the correct fields', ->
        keys = _.keys(_.last(Backbone.sync.args)[1].attributes)
        keys.should.eql ['url', 'message', 'user_name', 'user_email']

      it 'has the correct data', ->
        attributes = _.last(Backbone.sync.args)[1].attributes
        attributes.user_name.should.equal 'Foo Bar'
        attributes.user_email.should.equal 'foo@bar.com'
        attributes.message.should.equal 'My message'
        _.isUndefined(attributes.url).should.be.false

    describe 'Logged in', ->
      beforeEach ->
        @view.user = (@user = new Backbone.Model fabricate 'user')
        @view.renderTemplates()
        @view.$('textarea[name="message"]').val('My message')
        @view.$('form').submit()

      it 'has the correct data', ->
        keys = _.keys(_.last(Backbone.sync.args)[1].attributes)
        keys.should.eql ['url', 'message']
