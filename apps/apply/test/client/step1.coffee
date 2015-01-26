_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
State = require '../../client/models/state'
Form = require '../../client/models/form'
Step1View = benv.requireWithJadeify resolve(__dirname, '../../client/views/step1'), [
  'template'
  'usTemplate'
  'themTemplate'
  'formTemplates.gallery'
  'formTemplates.institution'
  'formTemplates.fair'
  'formTemplates.general'
]

describe 'Step1View', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @state = new State
      @form = new Form
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new Step1View state: @state, form: @form
    @view.render()

  it 'renders the shell template', ->
    @view.$('h1').text().should.equal 'Apply to become an Artsy Partner'
    @view.$('.paf-type-select option').first().text().should.equal 'Select Organization Type'

  it 'renders the relevant form when an org type is selected', ->
    @state.set 'mode', 'gallery'
    @view.$('input[name="company"]').attr('placeholder').should.equal 'Gallery Name'
    @view.$('input[name="title"]').attr('placeholder').should.equal 'Title at gallery'
    @view.$('input[name="URL"]').length.should.equal 0
    @state.set 'mode', 'institution'
    @view.$('input[name="company"]').attr('placeholder').should.equal 'Museum / Institution Name'
    @view.$('input[name="URL"]').length.should.equal 1

  it 'changes the address forms when the country is changed', (done) ->
    @state.set 'mode', 'institution'
    @view.selectCountry $.Event(currentTarget: val: 'United States')
    _.defer =>
      @view.$('input[name="state"]').length.should.equal 1
      @view.selectCountry $.Event(currentTarget: val: 'Canada')
      _.defer =>
        @view.$('input[name="state"]').length.should.equal 0
        done()
