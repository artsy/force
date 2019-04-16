benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
path = require 'path'

describe 'ShareView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      filename = path.resolve(__dirname, '../view.coffee')
      ShareView = benv.requireWithJadeify filename, ['template']
      @view = new ShareView
        el: $('body')
        imageUrl: 'foo.jpg'
      done()

  afterEach ->
    benv.teardown()

  describe '#initialize', ->

    it 'renders the menu with the imageUrl', ->
      $('.share-toggle').click()
      $('.share-menu').html().should.containEql 'foo.jpg'

    it 'renders the modal', ->
      $('.share-toggle').click()
      $('.share-menu-modal').css('opacity').should.equal '1'

  describe '#toggleShare', ->

    it 'hides the menu', ->
      $('.share-toggle').click()
      $('.share-menu').hasClass('is-visible').should.be.false()

    it 'hides the modal', ->
      $('.share-toggle').click()
      $('.share-menu-modal').hasClass('is-visible').should.be.false()

    it 'hides the menu when the modal is clicked', ->
      $('.share-menu-modal').click()
      $('.share-menu').hasClass('is-visible').should.be.false()
