benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
State = require '../models/state'
Form = require '../models/form'
Step1View = require '../views/step1'

describe 'Step1View', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      @state = new State
      @form = new Form
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new Step1View state: @state, form: @form

  it 'renders the shell template', ->
    console.log @view.render().$el.html()
