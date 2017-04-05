_ = require 'underscore'
Backbone = require 'backbone'
benv = require 'benv'
sinon = require 'sinon'
sd = require('sharify').data
{ resolve } = require 'path'
rewire = require 'rewire'
UnsubscribeView = rewire '../client/view'
UnsubscribeView.__set__ 'FlashMessage', flashStub = sinon.stub()
emailTypes = require '../email_types'

describe 'Unsubscribe View', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    benv.setup =>
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: {}
        asset: (->)
        emailTypes: emailTypes
      }, =>
        UnsubscribeView.__set__ 'sd', { UNSUB_AUTH_TOKEN: 'cat' }
        @view = new UnsubscribeView
          el: $('body')
        done()

  afterEach ->
    Backbone.sync.restore()

  it 'renders checkboxes for each email type, including a select all', ->
    _(_.keys(emailTypes)).each (type) =>
      @view.$el.find("input[name='#{type}']").length.should.equal 1
    @view.$el.find("input[name='selectAll']").length.should.equal 1

  describe 'posting to the API', ->

    it 'correctly passes in the token and selected email types', ->
      @view.$el.find("input[name='selectAll']").prop('checked').should.equal false
      @view.$el.find("input[name='personalized_email']").click()
      @view.$el.find('button').click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal 'personalized_email'
      _.last(Backbone.sync.args)[1].attributes.authentication_token.should.equal 'cat'

    it 'correctly passes email type "all" when selectAll has occurred', ->
      @view.$el.find("input[name='selectAll']").click()
      @view.$el.find('button').click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal 'all'
      _.last(Backbone.sync.args)[1].attributes.authentication_token.should.equal 'cat'

    it 'renders success flash message on success', ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success'
      @view.$el.find('button').click()
      _.last(flashStub.args)[0].message.should.equal "You’ve been unsubscribed."

    it 'renders error flash message on error', ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'error'
      @view.$el.find('button').click()
      _.last(flashStub.args)[0].message.should.equal "Whoops, there was an error."
