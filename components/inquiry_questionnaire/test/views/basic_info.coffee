Q = require 'q'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
setup = require './setup'
BasicInfo = benv.requireWithJadeify require.resolve('../../views/basic_info'), ['template']

describe 'BasicInfo', setup ->
  beforeEach ->
    sinon.stub BasicInfo::, 'postRender'
    @view = new BasicInfo user: @currentUser, artwork: @artwork, state: @state

  afterEach ->
    @view.postRender.restore()

  describe '#render', ->
    beforeEach ->
      @artwork.related().partner.set 'pre_qualify', true
      @view.render()

    it 'renders the form', ->
      @view.$('.iq-headline').text()
        .should.containEql 'Gagosian Gallery requests additional information before placing an inquiry'
      @view.$('input').map(-> $(this).attr('name')).get()
        .should.eql ['profession', 'phone']
      @view.$('.js-nevermind').text().should.equal 'Nevermind, cancel my inquiry' # pre_qualify

  describe 'next', ->
    beforeEach ->
      sinon.stub(Backbone, 'sync')
        .returns $.Deferred().resolve().promise()

      @state.set 'steps', ['basic_info', 'after_basic_info']
      @view.render()

    afterEach ->
      Backbone.sync.restore()

    it 'saves the form data onto the user and nexts the state', ->
      Backbone.sync.called.should.be.false()

      @view.$('input[name="profession"]').val 'Human'
      @view.$('input[name="phone"]').val '555-555-5555'
      @view.$('button').click()

      Backbone.sync.callCount.should.equal 1
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][0].should.equal 'update'
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
      Backbone.sync.args[0][1].attributes.profession.should.equal 'Human'
      Backbone.sync.args[0][1].attributes.phone.should.equal '555-555-5555'

      @view.state.current().should.equal 'after_basic_info'
