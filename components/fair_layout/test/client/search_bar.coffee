_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'

Bloodhound = -> ttAdapter: sinon.stub(), initialize: sinon.stub()
Bloodhound.tokenizers = obj: whitespace: sinon.stub()

describe 'FairHeaderView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        Bloodhound: Bloodhound
      Backbone.$ = $
      $.fn.typeahead = sinon.stub()
      done()

  after -> benv.teardown()

  beforeEach (done) ->
    @fair = new Fair fabricate 'fair'
    @profile = new Profile fabricate 'fair_profile'
    benv.render resolve(__dirname, '../../templates/nav.jade'), {fair: @fair, profile: @profile, sd: {}, _: _}, =>
      FairHeaderView = benv.require resolve(__dirname, '../../client/header')
      @view = new FairHeaderView el: $('.fair-layout-nav'), model: @profile, fair: @fair
      @$template = $('body')
      done()

  describe 'template', ->
    it 'should render the header', ->

      html = @$template.html()
      html.should.containEql '<a alt="Armory Show 2013" title="Armory Show 2013" href="/the-armory-show" class="fair-layout-logo">'
      html.should.containEql 'fair-layout-search'
      html.should.containEql '<a href="/the-armory-show/browse/booths" class="garamond-tab">Browse</a>'
      html.should.containEql '<a href="/the-armory-show/info" class="garamond-tab">Info</a>'

  describe '#initialize', ->
    it 'sets up the view', ->
      @view.model.should.eql @profile
      @view.fair.should.eql @fair
      @view.searchBarView.$el.length.should.be.ok()
      @view.searchBarView.$input.length.should.be.ok()
      @view.searchBarView.fairId.should.equal @fair.id
