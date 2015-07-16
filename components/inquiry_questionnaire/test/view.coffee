_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'

class ExampleA extends Backbone.View
  render: -> @$el.html 'exampleA'; this
class ExampleB extends Backbone.View
  render: -> @$el.html 'exampleB'; this

InquiryQuestionnaireView = rewire '../view'
InquiryQuestionnaireView.__set__ 'map', {
  views: exampleA: ExampleA, exampleB: ExampleB
  steps: ['exampleA', 'exampleB']
}

xdescribe 'InquiryQuestionnaireView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @user = new CurrentUser fabricate 'user'
    @artwork = new Artwork fabricate 'artwork'
    @view = new InquiryQuestionnaireView user: @user, artwork: @artwork

  it 'renders the sub-template', ->
    @view.render().$el.text().should.equal 'exampleA'
    @view.state.next()
    @view.render().$el.text().should.equal 'exampleB'
    @view.state.end().should.be.true
