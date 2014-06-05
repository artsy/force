_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'EditCollectionModal', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        EditCollectionModal = benv.requireWithJadeify(
          resolve(__dirname, '../../client/edit_collection_modal')
          ['newTemplate', 'editTemplate']
        )
        EditCollectionModal::initialize = sinon.stub()
        EditCollectionModal::close = sinon.stub()
        @view = new EditCollectionModal
          el: $('body')
          collection: new Backbone.Model id: 'saved-artwork'
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'adds the collection', ->
      @view.collection.get('id').should.equal 'saved-artwork'

  describe '#submit', ->

    it 'saves the collection and closes the modal', ->
      @view.collection.save = sinon.stub()
      @view.$('input').val 'FooBarBaz'
      @view.submit()
      @view.collection.save.called.should.be.ok
      @view.close.called.should.be.ok

  describe '#delete', ->

    it 'destroys the collection', ->
      global.confirm = -> true
      @view.collection.destroy = sinon.stub()
      @view.delete()
      @view.collection.destroy.called.should.be.ok
      delete global.confirm