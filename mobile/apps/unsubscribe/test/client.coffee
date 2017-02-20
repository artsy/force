_ = require 'underscore'
Backbone = require 'backbone'
benv = require 'benv'
sinon = require 'sinon'
{ resolve } = require 'path'
emailTypes = require '../email_types.coffee'

describe 'Unsubscribe View', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/index.jade'), {
        sd: {}
        emailTypes: emailTypes
      }, =>
        UnsubscribeView = benv.require resolve(__dirname, '../client')
        @view = new UnsubscribeView el: $('#unsubscribe-content'), unsubToken: 'cat'
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  it 'renders checkboxes for each email type, including a select all', ->
    _(_.keys(emailTypes)).each (type) =>
      @view.$el.find("input[name='#{type}']").length.should.equal 1
    @view.$el.find("input[name='selectAll']").length.should.equal 1

  describe 'posting to the API', ->

    it 'correctly passes in the token and selected email types', ->
      @view.$el.find("input[name='selectAll']").prop('checked').should.equal false
      @view.$el.find("input[name='personalized_email']").prop('checked', true)
      @view.$el.find('button').click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal 'personalized_email'
      _.last(Backbone.sync.args)[1].attributes.authentication_token.should.equal 'cat'

    it 'correctly passes email type "all" when selectAll has occurred', ->
      @view.$el.find("input[name='selectAll']").prop('checked', true)
      @view.$el.find('button').click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal 'all'
      _.last(Backbone.sync.args)[1].attributes.authentication_token.should.equal 'cat'

    it 'renders success message on success', ->
      @view.$el.find('button').click()
      _.last(Backbone.sync.args)[2].success {}
      @view.$el.html().should.containEql "You've been unsubscribed"

    it 'renders error message on error', ->
      @view.$el.find('button').click()
      _.last(Backbone.sync.args)[2].error {}
      @view.$el.html().should.containEql "Whoops, there was an error"
