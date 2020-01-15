_ = require 'underscore'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'SpecialistView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      sinon.stub $, 'ajax'

      SpecialistView = benv.requireWithJadeify resolve(__dirname, '../client/specialist_view'), ['template', 'successTemplate']

      @view = new SpecialistView
        collection: new Backbone.Collection [fabricate 'representative']
        el: $ 'body'

      @view.validateForm = -> true
      @view.formIsSubmitting = -> false
      done()

  afterEach ->
    Backbone.sync.restore()
    $.ajax.restore()
    benv.teardown()

  describe '#submitForm', ->
    beforeEach ->
      @view.render()
    it 'displays successTemplate', (done) ->
      $('#modal-contact-submit').click()
      $.ajax.args[0][0].success()

      @view.$el.html().should.containEql "Thank you."
      done()
