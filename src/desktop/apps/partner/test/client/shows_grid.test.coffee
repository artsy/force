Backbone = require 'backbone'
sinon = require 'sinon'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'
_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'

PartnerShowsGridView = rewire '../../client/shows_grid'

describe 'PartnerShowsGridView', ->

  describe '#initializeShows', ->

    beforeEach (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $

        benv.render resolve(__dirname, '../../templates/shows_grid.jade'), {
          partner: { href: -> }
          params: {}
        }, =>

          # fabricated shows groundtruth
          # gallery => featured: 0, current: 3, upcoming: 2, past: 5 (total: 10)
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
            fabricate('show', { name: 'show10', status: 'running' } ),
            fabricate('show', { name: 'show11', displayable: false } ),
            fabricate('show', { name: 'show12', status: 'running', displayable: false } ),
            fabricate('show', { name: 'show13', status: 'upcoming', displayable: false } )
          ]
          @partnerShows = new PartnerShows()
          @partnerShows.fetch = (options) =>
            page = options.data.page
            size = options.data.size
            @partnerShows.reset()
            @partnerShows.add @src
            options.success?()
          @PartnerShows = sinon.stub()
          @PartnerShows.returns @partnerShows
          PartnerShowsGridView.__set__ 'PartnerShows', @PartnerShows

          @template = sinon.stub()
          PartnerShowsGridView.__set__ 'template', @template

          @profile = new Profile fabricate 'partner_profile'
          @partner = @profile.related().owner
          done()

    afterEach -> benv.teardown()

    it 'respects the dispalyable attribute of partner shows', ->
      new PartnerShowsGridView
        el: $ '.partner-shows'
        partner: @partner

      @template.args[0][0].current.should.have.lengthOf 3
      @template.args[0][0].upcoming.should.have.lengthOf 2
      @template.args[0][0].past.should.have.lengthOf 4

    it 'fetches 1 featured and all other shows and renders them by default', ->
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

      _.isUndefined(@template.args[0][0].featured).should.be.ok()
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

describe '#maybeFetchAndRenderShows', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/shows_grid.jade'), {
        partner: { href: -> }
        params: {}
      }, =>
        PartnerShowsGridView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/shows_grid'), ['template', 'showFiguresTemplate']
        )
        @src = [
          fabricate('show', { name: 'show1' } ),
          fabricate('show', { name: 'show2', featured: true } ),
          fabricate('show', { name: 'show3' } ),
          fabricate('show', { name: 'show4' } ),
          fabricate('show', { name: 'show5' } ),
          fabricate('show', { name: 'show6' } ),
          fabricate('show', { name: 'show7' } ),
          fabricate('show', { name: 'show8' } ),
          fabricate('show', { name: 'show9' } ),
          fabricate('show', { name: 'show10' } ),
          fabricate('show', { name: 'show11' } ),
          fabricate('show', { name: 'show12' } ),
          fabricate('show', { name: 'show13' } ),
          fabricate('show', { name: 'show14' } ),
          fabricate('show', { name: 'show15' } ),
          fabricate('show', { name: 'show16' } ),
          fabricate('show', { name: 'show17' } ),
          fabricate('show', { name: 'show18' } ),
          fabricate('show', { name: 'show19' } ),
          fabricate('show', { name: 'show20' } ),
          fabricate('show', { name: 'show21' } ),
          fabricate('show', { name: 'show22' } ),
          fabricate('show', { name: 'show23' } ),
          fabricate('show', { name: 'show24' } ),
          fabricate('show', { name: 'show25' } ),
          fabricate('show', { name: 'show26' } ),
          fabricate('show', { name: 'show27' } ),
          fabricate('show', { name: 'show28' } ),
          fabricate('show', { name: 'show29' } ),
          fabricate('show', { name: 'show30' } ),
          fabricate('show', { name: 'show31' } ),
          fabricate('show', { name: 'show32' } ),
          fabricate('show', { name: 'show33' } ),
          fabricate('show', { name: 'show34' } ),
          fabricate('show', { name: 'show35' } )
        ]

        @partnerShows = new PartnerShows()
        @partnerShows.fetch = (options) =>
          page = options.data.page
          size = options.data.size
          @partnerShows.reset()
          @partnerShows.add @src
          options.success?()
        @PartnerShows = sinon.stub()
        @PartnerShows.returns @partnerShows
        PartnerShowsGridView.__set__ 'PartnerShows', @PartnerShows

        @profile = new Profile fabricate 'partner_profile'
        @partner = @profile.related().owner
        new PartnerShowsGridView
          el: $ '.partner-shows'
          partner: @partner
          isCombined: false
          numberOfFeatured: 1
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  it 'displays up to 30 shows and a See More button if there are more', ->
    $('figure').length.should.equal 31
    $('.js-partner-shows-more').length.should.equal 1

  it 'tries to fetch more shows if there are not enough shows', ->
    src = []
    @partnerShows.fetch = (options) =>
      page = options.data.page
      size = options.data.size
      @partnerShows.reset()
      @partnerShows.add src
      options.success?()
    $('.js-partner-shows-more').click()
    $('figure').length.should.equal 35

  it 'adds the fetched items if there are more', ->
    src = [fabricate('show', { name: 'show36' , status: 'closed' })]
    @partnerShows.fetch = (options) =>
      page = options.data.page
      size = options.data.size
      @partnerShows.reset()
      @partnerShows.add src
      options.success?()
    $('.js-partner-shows-more').click()
    $('figure').length.should.equal 36
    $('body').html().should.not.containEql 'See More'
