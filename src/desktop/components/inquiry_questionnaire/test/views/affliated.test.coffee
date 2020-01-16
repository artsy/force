benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ setup } = require './setup'

Affiliated = null
ResultsView = null
TypeaheadView = null
ResultsListView = null

describe 'Affiliated', setup ->
  beforeEach ->
    $.fn.typeahead = -> this

    benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
    window.jQuery = $

    Affiliated = benv.requireWithJadeify require.resolve('../../views/affiliated'), ['template']
    ResultsView = benv.requireWithJadeify require.resolve('../../../results_list/views/results'), ['template']
    TypeaheadView = benv.requireWithJadeify require.resolve('../../../typeahead/view'), ['templates.index']

    ResultsListView = rewire '../../../results_list/view'
    ResultsListView.__set__ 'ResultsView', ResultsView
    Affiliated.__set__ 'TypeaheadView', TypeaheadView
    Affiliated.__set__ 'ResultsListView', ResultsListView

    class TestAffiliated extends Affiliated
      title: 'This is only a test.'
      collectorProfileAttribute: 'affiliated_test_ids'
      galaxyPath: '_embedded.tests'
      galaxyEndpoint: 'tests'


    sinon.stub $, 'ajax'
      .yieldsTo 'success', {
        _embedded: {
          tests: [
            { id: 'foorbar', name: 'Foobar' }
          ]
        }
      }

    @currentUser.related()
      .collectorProfile.set 'affiliated_test_ids', ['foobar']

    @artwork.related()
      .partner.set 'pre_qualify', false

    @view = new TestAffiliated
      user: @currentUser, artwork: @artwork, state: @state

  afterEach ->
    $.ajax.restore()

  describe '#setup', ->
    it 'fetches the affiliated thing through Galaxy', ->
      fetch = $.ajax.args[0][0]

      fetch.headers
        .should.eql Accept: 'application/vnd.galaxy-public+json'
      fetch.url
        .should.containEql '/tests?token='
      fetch.data
        .should.eql ids: ['foobar']

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders the template', ->
      @view.$('.iq-headline').text()
        .should.equal 'This is only a test.(Optional)'
      @view.$('.results-list-item')
        .should.have.lengthOf 1
      @view.$('.results-list-item').text()
        .should.equal 'Foobar'
