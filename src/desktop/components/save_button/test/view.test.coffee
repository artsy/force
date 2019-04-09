benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
SaveButton = require '../view'
mediator = require '../../../lib/mediator'
{ resolve } = require 'path'

model = new Backbone.Model(id: 'artwork')
model.isSaved = sinon.stub()

xdescribe 'SaveButton', ->
  describe '#save', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $
        @view = new SaveButton { saved: null, model: model, el: $('<a></a>') }
        done()

    afterEach ->
      benv.teardown()

    it 'triggers the register modal if theres no saved', ->
      sinon.spy mediator, 'trigger'
      @view.$el.click()
      mediator.trigger.args[0][0].should.equal 'open:auth'
      mediator.trigger.args[0][1].mode.should.equal 'signup'
      mediator.trigger.restore()

    describe 'logged in behavior', ->
      beforeEach (done) ->
        benv.setup =>
          benv.expose { $: benv.require 'jquery' }
          Backbone.$ = $
          saved = new Backbone.Collection
          saved.unsaveArtwork = sinon.stub()
          saved.saveArtwork = sinon.stub()
          @view = new SaveButton { saved: saved, model: model, el: $('<a></a>') }
          done()

      afterEach ->
        benv.teardown()

      it 'saves the artwork if it is not in the collection', ->
        @view.model.isSaved = -> false
        @view.$el.click()
        @view.model.isSaved = -> true
        @view.saved.trigger 'add:artwork'
        @view.saved.saveArtwork.called.should.be.ok()
        @view.saved.saveArtwork.args[0][0].should.equal model.id
        @view.$el.attr('data-state').should.equal 'saved'

      it 'unsaves the artwork if it is in the collection', ->
        @view.model.isSaved = -> true
        @view.$el.click()
        @view.model.isSaved = -> false
        @view.saved.trigger 'remove:artwork'
        @view.saved.unsaveArtwork.called.should.be.ok()
        @view.saved.unsaveArtwork.args[0][0].should.equal model.id
        @view.$el.attr('data-state').should.equal 'unsaved'
