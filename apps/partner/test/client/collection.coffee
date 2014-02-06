benv          = require 'benv'
Backbone      = require 'backbone'
sinon         = require 'sinon'
Artworks      = require '../../../../collections/artworks.coffee'
Partner       = require '../../../../models/partner.coffee'
Profile       = require '../../../../models/profile.coffee'
_             = require 'underscore'
{ resolve }   = require 'path'
{ fabricate } = require 'antigravity'

describe 'PartnerCollectionView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'when loading next page of artworks', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
      }, =>
        PartnerCollectionView = mod = benv.requireWithJadeify(
          (resolve __dirname, '../../client/collection'), []
        )

        src = [
          { artwork: fabricate 'artwork', id: 'artwork1' },
          { artwork: fabricate 'artwork', id: 'artwork2' },
          { artwork: fabricate 'artwork', id: 'artwork3' },
          { artwork: fabricate 'artwork', id: 'artwork4' },
          { artwork: fabricate 'artwork', id: 'artwork5' },
          { artwork: fabricate 'artwork', id: 'artwork6' },
          { artwork: fabricate 'artwork', id: 'artwork7' }
        ]

        collection = new Artworks()
        sinon.stub collection, "fetch", (options) =>
          works = []
          n = if options.data.page is 2 then 2 else 3
          _(n).times =>
            work = src.shift()
            works.push work unless _.isUndefined work
          dest = new Artworks works
          options.success?(dest, null, options)

        @profile = new Profile fabricate 'partner_profile'
        @partner = new Partner @profile.get 'owner'
        @ArtworkColumnsView = sinon.stub()
        @ArtworkColumnsView.appendArtworks = sinon.stub()
        @ArtworkColumnsView.returns @ArtworkColumnsView
        mod.__set__ 'ArtworkColumnsView', @ArtworkColumnsView
        @view = new PartnerCollectionView
          profile: @profile
          partner: @partner
          collection: collection
          pageSize: 3
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#loadNextPage', ->

      it 'calls ArtworkColumnsView to render the first page', ->
        @ArtworkColumnsView.appendArtworks.calledOnce.should.be.true
        @view.nextPage.should.equal 2

      it 'uses ArtworkColumns to render the next pages individually until the end', ->
        # fetches page 1 on init...
        @view.nextPage.should.equal 2
        artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
        artworks.should.have.lengthOf 3
        artworks[0].get('artwork').id.should.equal 'artwork1'
        artworks[1].get('artwork').id.should.equal 'artwork2'
        artworks[2].get('artwork').id.should.equal 'artwork3'

        # on page 2, the response is not a full page
        @view.loadNextPage()
        artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork4'
        artworks[1].get('artwork').id.should.equal 'artwork5'
        @view.nextPage.should.equal 3

        # only two left in the whole set
        @view.loadNextPage()
        artworks = _.last(@ArtworkColumnsView.appendArtworks.args)[0]
        artworks.should.have.lengthOf 2
        artworks[0].get('artwork').id.should.equal 'artwork6'
        artworks[1].get('artwork').id.should.equal 'artwork7'
        @view.nextPage.should.equal 4

        @view.loadNextPage()
        @view.nextPage.should.equal 4
        @view.loadNextPage()
        @view.loadNextPage()
        @view.nextPage.should.equal 4

        # 7 works, page size 3, then 2, then 3, 3 calls to get all
        @ArtworkColumnsView.appendArtworks.callCount.should.equal 3
