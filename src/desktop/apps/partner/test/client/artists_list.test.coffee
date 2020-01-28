Backbone = require 'backbone'
sinon = require 'sinon'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
rewire = require 'rewire'

PartnerArtistsListView = rewire '../../client/artists_list'

describe 'PartnerArtistsListView', ->

  describe '#groupPartnerArtists', ->

    beforeEach (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $
        benv.render resolve(__dirname, '../../templates/artists_list.jade'), { groups: {} }, =>
          @template = sinon.stub()
          PartnerArtistsListView.__set__ 'template', @template
          done()

    afterEach -> benv.teardown()

    it 'groups partner artists into represented and nonrepresented groups', ->
      pas = new PartnerArtists [
        # 7 represented artists
        # 4 non-represented artists with published_artworks_count > 0
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist', represented_by: false)
      ]
      new PartnerArtistsListView
        collection: pas.models
        el: $ 'body'
        numberOfColumns: 4

      groups = @template.args[0][0].groups
      groups.should.have.lengthOf 2
      groups[1].label.should.equal "works available by"
      groups[1].cols.should.have.lengthOf 2
      groups[1].cols[0].should.have.lengthOf 2
      groups[1].cols[1].should.have.lengthOf 2
      groups[0].label.should.equal "represented artists"
      groups[0].cols.should.have.lengthOf 2
      groups[0].cols[0].should.have.lengthOf 4
      groups[0].cols[1].should.have.lengthOf 3

    it 'groups partner artists into one single group if no valid non-represented artists', ->
      pas = new PartnerArtists [
        # 7 represented artists
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist')
      ]
      new PartnerArtistsListView
        collection: pas.models
        el: $ 'body'
        numberOfColumns: 4

      groups = @template.args[0][0].groups
      groups.should.have.lengthOf 1
      groups[0].label.should.equal "artists"
      groups[0].cols.should.have.lengthOf 4
      groups[0].cols[0].should.have.lengthOf 2
      groups[0].cols[1].should.have.lengthOf 2
      groups[0].cols[2].should.have.lengthOf 2
      groups[0].cols[3].should.have.lengthOf 1

    it 'groups partner artists into groups with correct number of items in each column', ->
      pas = new PartnerArtists [
        # 6 represented artists
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist')
      ]
      new PartnerArtistsListView
        collection: pas.models
        el: $ 'body'
        numberOfColumns: 4

      groups = @template.args[0][0].groups
      groups.should.have.lengthOf 1
      groups[0].label.should.equal "artists"
      groups[0].cols.should.have.lengthOf 4
      groups[0].cols[0].should.have.lengthOf 2
      groups[0].cols[1].should.have.lengthOf 2
      groups[0].cols[2].should.have.lengthOf 1
      groups[0].cols[3].should.have.lengthOf 1

    it 'groups partner artists into groups with correct number of items in single column', ->
      pas = new PartnerArtists [
        # 6 represented artists
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist'),
        fabricate('partner_artist')
      ]
      new PartnerArtistsListView
        collection: pas.models
        el: $ 'body'
        numberOfColumns: 1

      groups = @template.args[0][0].groups
      groups.should.have.lengthOf 1
      groups[0].label.should.equal "artists"
      groups[0].cols.should.have.lengthOf 1
      groups[0].cols[0].should.have.lengthOf 6

    it 'groups all artists together when partner has distinguish_represented_artists: false', ->
      pas = new PartnerArtists [
        fabricate('partner_artist', represented_by: false),
        fabricate('partner_artist')
      ]
      new PartnerArtistsListView
        collection: pas.models
        el: $ 'body'
        numberOfColumns: 4
        distinguishRepresentedArtists: false

      groups = @template.args[0][0].groups
      groups.should.have.lengthOf 1
      groups[0].label.should.equal 'artists'
      groups[0].cols.should.have.lengthOf 4
      groups[0].cols[0].should.have.lengthOf 1
      groups[0].cols[1].should.have.lengthOf 1
      groups[0].cols[2].should.have.lengthOf 0

  describe '#render', ->

    beforeEach (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $
        benv.render resolve(__dirname, '../../templates/artists_list.jade'), { groups: {} }, =>
          @PartnerArtistsListView = mod =
            benv.requireWithJadeify resolve(__dirname, '../../client/artists_list'), ['template']
          @partner = fabricate('partner', default_profile_id: 'taipei-fine-art-museum')
          @pas = new PartnerArtists [
            fabricate('partner_artist', partner: @partner),
            fabricate('partner_artist', partner: @partner, published_artworks_count: 0),
            fabricate('partner_artist', partner: @partner)
          ]
          done()

    afterEach -> benv.teardown()

    describe 'for partner galleries', ->

      beforeEach (done) ->
        @view = new @PartnerArtistsListView
          el: $ 'body'
          collection: @pas.models
        done()

      it 'links artists to partner artist page if they have published artworks with this partner', ->
        @view.$('.artists-column > li > a').length.should.equal 2
        _.each @view.$('.artists-column > li > a'), (a) =>
          $(a).attr('href').should.startWith "/#{@partner.default_profile_id}/artist/"

      it 'disables artists links if they do not have published artworks with this partner', ->
        @view.$('.artists-column > li > span').length.should.equal 1
        _.each @view.$('.artists-column > li > span'), (span) =>
          $(span).hasClass 'artist-name'

    describe 'for non-partner galleries', ->

      beforeEach (done) ->
        @view = new @PartnerArtistsListView
          el: $ 'body'
          collection: @pas.models
          linkToPartnerArtist: false
        done()

      it 'links artists to their artists pages', ->
        @view.$('.artists-column > li > a').length.should.equal 3
        _.each @view.$('.artists-column > li > a'), (a) =>
          $(a).attr('href').should.startWith "/artist/"
