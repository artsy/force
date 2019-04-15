benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
openFeedbackModal = rewire '../index'
openFeedbackModal.__set__
  views:
    how_can_we_help: benv.requireWithJadeify require.resolve('../views/how_can_we_help'), ['template']
    press: benv.requireWithJadeify require.resolve('../views/press'), ['template']
  openMultiPageModal: openMultiPageModal = sinon.stub()
  openFeedback: openFeedback = sinon.stub()

describe 'openFeedbackModal', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @modal = openFeedbackModal()

  it 'renders the multiple choice menu', ->
    $('.fm-multiple-choice > a')
      .map -> $(this).text()
      .get()
        .should.eql [
          "I have an auction-related question."
          'I’m an artist interested in listing my work.'
          'I’m an individual interested in selling artwork.'
          'I have a press inquiry.'
          'I have another question.'
        ]

  it 'moves to the next step when "press" is chosen', ->
    $('[data-answer="press"]').click()
    html = $('body').html()
    html.should.containEql 'For questions about press contact: <a href="mailto:press@artsy.net">press@artsy.net</a>'
    html.should.containEql 'For pitches and story ideas contact: <a href="mailto:pitches@artsy.net">pitches@artsy.net</a>'

  it 'opens the artist FAQ', (done) ->
    openMultiPageModal.called.should.be.false()
    $('[data-answer="artist"]').click()
    @modal.view.on 'closed', ->
      openMultiPageModal.called.should.be.true()
      openMultiPageModal.args[0][0].should.equal 'artist-faqs'
      done()

  it 'opens the feedback form', (done) ->
    openFeedback.called.should.be.false()
    $('[data-answer="feedback"]').click()
    @modal.view.on 'closed', ->
      openFeedback.called.should.be.true()
      done()
