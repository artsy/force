Backbone       = require 'backbone'
sinon          = require 'sinon'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
_              = require 'underscore'
benv           = require 'benv'
{ resolve }    = require 'path'
{ fabricate }  = require 'antigravity'
rewire         = require 'rewire'

PartnerArtistsListView = rewire '../../client/artists_list'

describe 'PartnerArtistsListView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      benv.render resolve(__dirname, '../../templates/artists_list.jade'), { groups: {} }, =>
        @template = sinon.stub()
        PartnerArtistsListView.__set__ 'template', @template
        done()

  afterEach -> benv.teardown()

  describe '#groupPartnerArtists', ->

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
