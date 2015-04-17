_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
PartnerShows = require '../../../../../collections/partner_shows.coffee'
InstallShot = require '../../../../../models/install_shot.coffee'
RelatedShowsView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template', 'relatedShowsTemplate']


describe 'RelatedShowsView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
      benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @relatedShows = new PartnerShows [
      fabricate 'show', 
        name: 'Test Show'
        start_at: '2013-07-12T04:00:00+00:00'
        end_at: '2013-08-23T04:00:00+00:00' 
        partner: fabricate 'partner', name: 'Test Gallery' 
    ]
    @installShot = new InstallShot fabricate 'show_install_shot'
    @title = 'Current Shows in Test City'
    @view = new RelatedShowsView collection: @relatedShows, title: @title
    done() 

  afterEach -> 
    Backbone.sync.restore() 

  describe '#render', -> 
    it 'has the correct title', -> 
      @view.render
      @view.$('.show-related-shows-title').html().should.containEql 'Current Shows in Test City'

    it 'displays the information from the show', ->
      Backbone.sync.args[0][2].success @installShot
      @view.render
      @view.$('.show-related-show-title').html().should.containEql 'Test Show'
      @view.$('.show-related-show-partner').html().should.containEql 'Test Gallery'
      @view.$('.show-related-show-running-dates').html().should.containEql 'July 12 – August 23'
    
    xit 'displays the correct number of install shots', ->
