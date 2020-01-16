_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
should = require 'should'
Backbone = require 'backbone'
PartnerArtist = require '../../models/partner_artist'

describe 'PartnerArtist', ->

  beforeEach ->
    partner = fabricate 'partner', { id: 'baang-plus-burne', default_profile_id: 'baang-and-burne' }
    @partnerArtist = new PartnerArtist fabricate 'partner_artist', partner: partner

  describe '#href', ->

    it 'uses partners default profile id instead of id', ->
      @partnerArtist.href().should.equal "/#{@partnerArtist.get('partner').default_profile_id}/artist/#{@partnerArtist.get('artist').id}"
