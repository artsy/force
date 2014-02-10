benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
Partner       = require '../../../../models/partner.coffee'
Profile       = require '../../../../models/profile.coffee'
PartnerShows  = require '../../../../collections/partner_shows.coffee'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'PartnerShowsView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'when initializing shows', ->

    beforeEach (done) ->

      # fabricated show defaults
      # featured: false, status: close
      #
      # fabricated shows groundtruth
      # gallery     => featured: 0, current: 3, upcoming: 2, past: 5 (total: 10)
      # institution => featured: 1, current: 3, upcoming: 2, past: 4 (total: 10)
      src = [
        fabricate('show', { name: 'show1' } ),
        fabricate('show', { name: 'show2', featured: true } ),
        fabricate('show', { name: 'show3' } ),
        fabricate('show', { name: 'show4', status: 'running' } ),
        fabricate('show', { name: 'show5' } ),
        fabricate('show', { name: 'show6', status: 'running' } ),
        fabricate('show', { name: 'show7', status: 'upcoming' } ),
        fabricate('show', { name: 'show8' } ),
        fabricate('show', { name: 'show9', status: 'upcoming' } ),
        fabricate('show', { name: 'show10', status: 'running' } )
      ]

      @collection = new PartnerShows()
      sinon.stub @collection, "fetchUntilEnd", (options) =>
        @collection.add src
        options.success?(@collection, null, options)
      done()

    describe 'for institutions', ->

      beforeEach (done) ->
        sinon.stub Backbone, 'sync'
        benv.render resolve(__dirname, '../../templates/index.jade'), {
          profile: new Profile fabricate 'partner_profile'
          sd: { PROFILE: fabricate 'partner_profile' }
        }, =>
          PartnerShowsView = mod = benv.requireWithJadeify(
            (resolve __dirname, '../../client/shows'), ['template']
          )
          @profile = new Profile fabricate 'partner_profile'
          @partner = new Partner @profile.get 'owner'
          @template = sinon.stub()
          mod.__set__ 'template', @template
          @view = new PartnerShowsView
            profile: @profile
            partner: @partner
            collection: @collection
            el: $ 'body'
          done()

      afterEach ->
        Backbone.sync.restore()

      describe '#initializeShows', ->

        it 'shows featured, current, upcoming, and past shows for institutions', ->
          @template.args[0][0].featured.get('name').should.equal 'show2'
          @template.args[0][0].current.should.have.lengthOf 3
          @template.args[0][0].upcoming.should.have.lengthOf 2
          @template.args[0][0].past.should.have.lengthOf 4

    describe 'for galleries', ->

      beforeEach (done) ->
        sinon.stub Backbone, 'sync'
        benv.render resolve(__dirname, '../../templates/index.jade'), {
          profile: new Profile fabricate 'partner_profile'
          sd: { PROFILE: fabricate 'partner_profile' }
        }, =>
          PartnerShowsView = mod = benv.requireWithJadeify(
            (resolve __dirname, '../../client/shows'), ['template']
          )
          @profile = new Profile fabricate('partner_profile', owner_type: 'PartnerGallery')
          @partner = new Partner @profile.get 'owner'
          @template = sinon.stub()
          mod.__set__ 'template', @template
          @view = new PartnerShowsView
            profile: @profile
            partner: @partner
            collection: @collection
            el: $ 'body'
          done()

      afterEach ->
        Backbone.sync.restore()

      describe '#initializeShows', ->

        it 'shows current, upcoming, and past shows for galleries', ->
          _.isNull(@template.args[0][0].featured).should.be.ok
          @template.args[0][0].current.should.have.lengthOf 3
          @template.args[0][0].upcoming.should.have.lengthOf 2
          @template.args[0][0].past.should.have.lengthOf 5
