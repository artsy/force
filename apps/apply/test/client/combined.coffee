_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
State = require '../../client/models/state'
Form = require '../../client/models/form'
CombinedView = benv.requireWithJadeify resolve(__dirname, '../../client/views/combined'), [
  'template'
  'subformTemplates.gallery'
]

describe 'CombinedView', ->
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
    sinon.stub Backbone, 'sync'
    @view = new CombinedView state: @state, form: @form
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  it 'renders the template', ->
    @view.$('h1').text().should.equal 'Apply to become an Artsy Partner'
    @view.$('.paf-type-select option').first().text().should.equal 'Select Organization Type'
    @view.$('#paf-company-label').text().should.equal 'Organization Name'

  it 'renders the relevant subform when an org type is selected', ->
    @state.set 'mode', 'gallery'
    @view.$('#paf-company-label').text().should.equal 'Gallery Name'
    @view.$el.html().should.containEql 'Which artists do you represent?'
    @state.set 'mode', 'institution'
    @view.$('#paf-company-label').text().should.equal 'Institution Name'
    @view.$el.html().should.not.containEql 'Which artists do you represent?'

  it 'submits the form', ->
    @view.$('input[name="company"]').val 'My Gallery'
    @view.$('button').click()
    Backbone.sync.args[0][1].url.should.containEql '/apply/form'
    Backbone.sync.args[0][1].attributes['company'].should.equal 'My Gallery'
