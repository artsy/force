_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Fair                = require '../../../models/fair'
Profile             = require '../../../models/profile'
{ FairHeaderView }  = require '../index'

Bloodhound = -> ttAdapter: sinon.stub(), initialize: sinon.stub()
Bloodhound.tokenizers = obj: whitespace: sinon.stub()

describe 'FairHeaderView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        Bloodhound: Bloodhound
      Backbone.$      = $
      $.fn.typeahead  = sinon.stub()
      done()

  after -> benv.teardown()

  beforeEach (done) ->
    @fair     = new Fair fabricate 'fair'
    @profile  = new Profile fabricate 'fair_profile'
    benv.render resolve(__dirname, '../header.jade'), { micrositeFair: @fair, micrositeProfile: @profile }, =>
      @view       = new FairHeaderView el: $('.fair-page-header'), model: @profile, fair: @fair
      @$template  = $('body')
      done()

  describe 'template', ->
    it 'should render the header', ->
      html = @$template.html()
      html.should.include '<a alt="Armory Show 2013" href="/the-armory-show" class="fair-logo">'
      html.should.include 'fair-search-input'
      html.should.include '<a href="/the-armory-show/browse/booths" class="garamond-tab">Browse</a>'
      html.should.include '<a href="/the-armory-show/info" class="garamond-tab">Info</a>'

  describe '#initialize', ->
    it 'sets up the view', ->
      @view.model.should.eql @profile
      @view.fair.should.eql @fair
      @view.searchBarView.$el.length.should.be.ok
      @view.searchBarView.$input.length.should.be.ok
      @view.searchBarView.fairId.should.equal @fair.id
