_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
benv = require 'benv'
Partner = require '../../../../../models/partner.coffee'
PartnerShow = require '../../../../../models/partner_show.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

HeroShowsCarousel = benv.requireWithJadeify resolve(
  __dirname, '../view.coffee'
), ['template']

describe 'HeroShowsCarousel', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      @partner = new Partner fabricate 'partner'
      @view = new HeroShowsCarousel partner: @partner
      done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#fetchShows', ->
    it 'makes proper requests to fetch shows', ->
      @view.fetchShows()
      (requests = Backbone.sync.args).length.should.equal 4
      _.each requests, (request) =>
        request[2].url.should.endWith "#{@partner.url()}/shows"
      requests[0][2].data.should.eql size: 1, sort: '-featured,-end_at', displayable: true
      requests[1][2].data.should.eql size: 50, status: 'running', sort: 'end_at', displayable: true
      requests[2][2].data.should.eql size: 50, status: 'upcoming', sort: 'start_at', displayable: true
      requests[3][2].data.should.eql size: 50, status: 'closed', sort: '-end_at', displayable: true

    it 'returns a thenable promise', ->
      _.isFunction(@view.fetchShows().then).should.be.ok()

    describe 'with featured, current, and upcoming shows', ->
      before ->
        @featured = [new PartnerShow fabricate 'show', featured: true]
        @current = [@featured[0]]
        @upcoming = []
        @past = []
        _.each [1..3], => @current.push new PartnerShow fabricate 'show', featured: false, status: 'running'
        _.each [0..3], => @upcoming.push new PartnerShow fabricate 'show', featured: false, status: 'upcoming'
        _.each [0..3], => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'
        @expected = @featured.concat(@current[1..3]).concat(@upcoming)

      beforeEach ->
        _.each [@featured, @current, @upcoming, @past], (collection, index) ->
          Backbone.sync
            .onCall index
            .yieldsTo 'success', collection

      it 'fetches shows and organizes them in proper order without past shows', ->
        @view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 8
          partnerShows.should.eql @expected

      it 'returns @maxNumberOfShows shows without past shows', ->
        view = new HeroShowsCarousel partner: @partner, maxNumberOfShows: 2
        view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 2
          partnerShows.should.eql @expected.slice(0, 2)

    describe 'with current and upcoming shows but without featured', ->
      before ->
        @featured = [new PartnerShow fabricate 'show', featured: false]
        @current = []
        @upcoming = []
        @past = []
        _.each [0..2], => @current.push new PartnerShow fabricate 'show', featured: false, status: 'running'
        _.each [0..3], => @upcoming.push new PartnerShow fabricate 'show', featured: false, status: 'upcoming'
        _.each [0..3], => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'
        @expected = @current.concat(@upcoming)

      beforeEach ->
        _.each [@featured, @current, @upcoming, @past], (collection, index) ->
          Backbone.sync
            .onCall index
            .yieldsTo 'success', collection

      it 'fetches shows and organizes them in proper order without past shows', ->
        @view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 7
          partnerShows.should.eql @expected

      it 'returns @maxNumberOfShows shows without past shows', ->
        view = new HeroShowsCarousel partner: @partner, maxNumberOfShows: 2
        view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 2
          partnerShows.should.eql @expected.slice(0, 2)

    describe 'with only past shows', ->
      before ->
        @featured = []
        @current = []
        @upcoming = []
        @past = []
        _.each [0..3], => @past.push new PartnerShow fabricate 'show', featured: false, status: 'closed'
        @expected = @past

      beforeEach ->
        _.each [@featured, @current, @upcoming, @past], (collection, index) ->
          Backbone.sync
            .onCall index
            .yieldsTo 'success', collection

      it 'fetches shows and returns only 2 past shows', ->
        @view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 2
          partnerShows.should.eql @expected.slice(0, 2)

      it 'returns @maxNumberOfShows past shows', ->
        view = new HeroShowsCarousel partner: @partner, maxNumberOfShows: 1
        view.fetchShows().then (partnerShows) =>
          partnerShows.should.have.lengthOf 1
          partnerShows.should.eql @expected.slice(0, 1)

  describe '#initCarousel', ->
    beforeEach ->
      sinon.stub @view, 'remove'

    afterEach ->
      @view.remove.restore()

    it 'removes the view if no partner shows', ->
      @view.initCarousel []
      @view.remove.calledOnce.should.be.ok()

  describe '#swipeDots', ->
    beforeEach ->
      sinon.stub($.fn, 'offset')

    afterEach ->
      $.fn.offset.restore()

    describe 'move right', ->
      it 'selects non-de-emphasized dot without moving the rail', ->
        html = """
          <div class="mgr-dots">
            <div class="mgr-dot is-active"></div>
            <div class="mgr-dot"></div>
            <div class="mgr-dot"></div>
            <div class="mgr-dot is-deemphasized"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
          </div>
        """
        $el = $ html
        @view.swipeDots($el, 3, 1)
        $el[0].outerHTML.should.equal """
          <div class="mgr-dots">
            <div class="mgr-dot"></div>
            <div class="mgr-dot is-active"></div>
            <div class="mgr-dot"></div>
            <div class="mgr-dot is-deemphasized"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
          </div>
        """

      it 'selects de-emphasized dot, re-styles dots and moves the rail', ->
        html = """
          <div class="mgr-dots">
            <div class="mgr-dot is-deemphasized" style="left: 0px;"></div>
            <div class="mgr-dot" style="left: 1px;"></div>
            <div class="mgr-dot" style="left: 2px;"></div>
            <div class="mgr-dot is-active" style="left: 3px;"></div>
            <div class="mgr-dot is-deemphasized" style="left: 4px;"></div>
            <div class="mgr-dot is-deemphasized is-hidden" style="left: 5px;"></div>
          </div>
        """
        $.fn.offset
          .onFirstCall().returns({top: 0, left: 2})
          .onSecondCall().returns({top: 0, left: 3})

        $el = $ html
        @view.swipeDots($el, 3, 4)
        $el[0].outerHTML.should.equal """
          <div class="mgr-dots">
            <div class="mgr-dot is-deemphasized is-hidden" style="left: -1px;"></div>
            <div class="mgr-dot is-deemphasized" style="left: 0px;"></div>
            <div class="mgr-dot" style="left: 1px;"></div>
            <div class="mgr-dot" style="left: 2px;"></div>
            <div class="mgr-dot is-active" style="left: 3px;"></div>
            <div class="mgr-dot is-deemphasized" style="left: 4px;"></div>
          </div>
        """

    describe 'move left', ->
      it 'selects non-de-emphasized dot without moving the rail', ->
        html = """
          <div class="mgr-dots">
            <div class="mgr-dot"></div>
            <div class="mgr-dot is-active"></div>
            <div class="mgr-dot"></div>
            <div class="mgr-dot is-deemphasized"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
          </div>
        """
        $el = $ html
        @view.swipeDots($el, 3, 0)
        $el[0].outerHTML.should.equal """
          <div class="mgr-dots">
            <div class="mgr-dot is-active"></div>
            <div class="mgr-dot"></div>
            <div class="mgr-dot"></div>
            <div class="mgr-dot is-deemphasized"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
            <div class="mgr-dot is-deemphasized is-hidden"></div>
          </div>
        """

      it 'selects de-emphasized dot, re-styles dots and moves the rail', ->
        html = """
          <div class="mgr-dots">
            <div class="mgr-dot is-deemphasized is-hidden" style="left: 0px;"></div>
            <div class="mgr-dot is-deemphasized" style="left: 1px;"></div>
            <div class="mgr-dot is-active" style="left: 2px;"></div>
            <div class="mgr-dot" style="left: 3px;"></div>
            <div class="mgr-dot" style="left: 4px;"></div>
            <div class="mgr-dot is-deemphasized" style="left: 5px;"></div>
          </div>
        """
        $.fn.offset
          .onFirstCall().returns({top: 0, left: 2})
          .onSecondCall().returns({top: 0, left: 1})

        $el = $ html
        @view.swipeDots($el, 3, 1)
        $el[0].outerHTML.should.equal """
          <div class="mgr-dots">
            <div class="mgr-dot is-deemphasized" style="left: 1px;"></div>
            <div class="mgr-dot is-active" style="left: 2px;"></div>
            <div class="mgr-dot" style="left: 3px;"></div>
            <div class="mgr-dot" style="left: 4px;"></div>
            <div class="mgr-dot is-deemphasized" style="left: 5px;"></div>
            <div class="mgr-dot is-deemphasized is-hidden" style="left: 6px;"></div>
          </div>
        """
