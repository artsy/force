Backbone       = require 'backbone'
sinon          = require 'sinon'
Partner        = require '../../../../models/partner.coffee'
Profile        = require '../../../../models/profile.coffee'
PartnerShows   = require '../../../../collections/partner_shows.coffee'
_              = require 'underscore'
benv           = require 'benv'
{ resolve }    = require 'path'
{ fabricate }  = require 'antigravity'
rewire         = require 'rewire'

PartnerShowsGridView = rewire '../../client/shows_grid'

describe 'PartnerShowsGridView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      benv.render resolve(__dirname, '../../templates/shows_grid.jade'), {
        partner: { href: -> }
        params: {}
      }, =>

        # fabricated shows groundtruth
        # gallery     => featured: 0, current: 3, upcoming: 2, past: 5 (total: 10)
        # institution => featured: 1, current: 3, upcoming: 2, past: 4 (total: 10)
        @src = [
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
        @partnerShows = new PartnerShows()
        @partnerShows.fetch = (options) =>
          page = options.data.page
          size = options.data.size
          @partnerShows.reset()
          @partnerShows.add @src.slice (page-1)*size, page*size
          options.success?()
        @PartnerShows = sinon.stub()
        @PartnerShows.returns @partnerShows
        PartnerShowsGridView.__set__ 'PartnerShows', @PartnerShows

        @template = sinon.stub()
        PartnerShowsGridView.__set__ 'template', @template

        @profile = new Profile fabricate 'partner_profile'
        @partner = new Partner @profile.get 'owner'
        done()

  afterEach -> benv.teardown()

  describe '#initializShows', ->

    it 'fetches 1 featued and all other shows and renders them by default', ->
      new PartnerShowsGridView
        el: $ '.partner-shows'
        partner: @partner

      @template.args[0][0].featured.get('name').should.equal "show2"
      @template.args[0][0].current.should.have.lengthOf 3
      @template.args[0][0].upcoming.should.have.lengthOf 2
      @template.args[0][0].past.should.have.lengthOf 4

    it 'fetches 0 featued and all other shows and renders them', ->
      new PartnerShowsGridView
        el: $ '.partner-shows'
        partner: @partner
        numberOfFeatured: 0

      _.isUndefined(@template.args[0][0].featured).should.be.ok
      @template.args[0][0].current.should.have.lengthOf 3
      @template.args[0][0].upcoming.should.have.lengthOf 2
      @template.args[0][0].past.should.have.lengthOf 5

    it 'fetches 1 featued and combined other shows and renders them', ->
      new PartnerShowsGridView
        el: $ '.partner-shows'
        partner: @partner
        isCombined: true
        numberOfShows: 6

      @template.args[0][0].featured.get('name').should.equal "show2"
      @template.args[0][0].current.should.have.lengthOf 6
      @template.args[0][0].upcoming.should.have.lengthOf 0
      @template.args[0][0].past.should.have.lengthOf 0
