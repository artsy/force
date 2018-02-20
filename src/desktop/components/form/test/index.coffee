_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Form = require '../index'
{ template } = require './fixture'

describe 'Form', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @model = new Backbone.Model
    @model.url = '/foo/bar'
    @$form = $(template)
    @form = new Form model: @model, $form: @$form

  describe '#submitting', ->
    it 'returns false the first time it is called, true every time after', ->
      @form.submitting().should.be.false()
      @form.submitting().should.be.true()
      @form.submitting().should.be.true()
      @form.submitting().should.be.true()

    it 'disables the button', (done) ->
      @form.submitting()
      _.defer => _.defer =>
        @$form.find('button').prop('disabled').should.be.true()
        done()

  describe '#submit', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'
      @$form.find('button').on 'click', _.bind(@form.submit, @form)

    afterEach ->
      Backbone.sync.restore()
      @$form.find('button').off 'click'

    it 'submits the form', ->
      Backbone.sync.called.should.be.false()
      @$form.find('button').click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][1].url.should.equal '/foo/bar'

    it 'submits the form one time until actually resolved', ->
      Backbone.sync.called.should.be.false()
      @$form.find('button').click()
      Backbone.sync.called.should.be.true()
      Backbone.sync.callCount.should.equal 1
      @$form.find('button').click()
      @$form.find('button').click()
      @$form.find('button').click()
      Backbone.sync.callCount.should.equal 1

    it 'submits indpendent of a UI event', ->
      Backbone.sync.called.should.be.false()
      @form.submit()
      Backbone.sync.called.should.be.true()

    it 'passes on the options to the model', (done) ->
      @form.submit null, success: ->
        true.should.be.true()
        done()
      Backbone.sync.args[0][2].success()

    describe 'error', ->
      beforeEach ->
        Backbone.sync.restore()
        sinon.stub(Backbone, 'sync').yieldsTo 'error'

      it 'moves the form into the error state; reenables the form', ->
        Backbone.sync.called.should.be.false()
        @$form.find('button').click()
        Backbone.sync.called.should.be.true()
        Backbone.sync.callCount.should.equal 1
        @$form.find('button').data('state').should.equal 'error'
        @$form.find('button').prop('disabled').should.be.false()
        @$form.find('button').click()
        Backbone.sync.callCount.should.equal 2

  describe '#reenable', ->
    it 'reenables the form', ->
      @form.submitting().should.be.false()
      @form.submitting().should.be.true()
      @form.reenable()
      @form.submitting().should.be.false()
      @form.submitting().should.be.true()

    it 'removes the disabled attr from the button', (done) ->
      @form.submitting()
      _.defer => _.defer =>
        @$form.find('button').prop('disabled').should.be.true()
        @form.reenable()
        @$form.find('button').prop('disabled').should.be.false()
        done()
