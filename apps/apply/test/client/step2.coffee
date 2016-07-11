_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
State = require '../../client/models/state'
Form = require '../../client/models/form'
Step2View = benv.requireWithJadeify resolve(__dirname, '../../client/views/step2'), [
  'template'
  'formTemplates.gallery'
  'formTemplates.institution'
  'formTemplates.fair'
  'formTemplates.general'
]

describe 'Step2View', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @state = new State step: 2, mode: 'gallery'
      @form = new Form
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new Step2View state: @state, form: @form
    @view.render()

  it 'renders the shell template', ->
    @view.$('.pah-step').first().text().should.equal 'Step 2 of 3'
    @view.$('h1').text().should.equal 'Which Artsy partnership features interest you most?'

  it 'renders the correct sub-template', (done) ->
    _.defer => _.defer =>
      @view.$('input[type="checkbox"]').first().attr('value').should.equal 'Gallery profile page'
      @state.set 'mode', 'institution'
      @view.renderMode()
      @view.$('input[type="checkbox"]').first().attr('value').should.equal 'Promoting collections'
      done()
