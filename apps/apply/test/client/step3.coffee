benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
State = require '../../client/models/state'
Form = require '../../client/models/form'
Step3View = benv.requireWithJadeify resolve(__dirname, '../../client/views/step3'), ['template']

describe 'Step3View', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @state = new State step: 3, mode: 'gallery'
      @form = new Form
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new Step3View state: @state, form: @form
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  it 'renders the shell template', ->
    @view.$('.pah-step').first().text().should.equal 'Step 3 of 3'
    @view.$('h1').text().should.equal 'How did you learn about Artsy?'

  it 'submits the form', ->
    @view.$('textarea[name="00NC0000005RGgg"]').val('Nope')
    @view.$('button').click()
    @form.get('00NC0000005RGgg').should.equal 'Nope'
    Backbone.sync.args[0][1].url.should.containEql '/apply/form'
    Backbone.sync.args[0][1].attributes['00NC0000005RGgg'].should.equal 'Nope'
