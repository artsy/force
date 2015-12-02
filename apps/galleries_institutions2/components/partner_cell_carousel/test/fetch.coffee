benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
_ = require 'underscore'
{ fabricate } = require 'antigravity'
CategoryCarousel = require '../fetch'
PartnerCategory = require '../../../../../models/partner_category'
Q = require 'bluebird-q'

describe 'fetch', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  afterEach ->
    Backbone.sync.restore()

  it 'fetches primary and secondary  buckets', ->
    primary = [fabricate 'partner', id: 'primary_1']
    secondary = [fabricate 'partner', id: 'secondary_1']
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category'
    carousel.fetch().then ->
      Backbone.sync.args[0][2].data.should.eql
        eligible_for_primary_bucket: true
        has_full_profile: true
        size: 6
        sort: '-random_score'
        partner_categories: ['id']

      Backbone.sync.args[1][2].data.should.eql
        eligible_for_secondary_bucket: true
        has_full_profile: true
        size: 6
        sort: '-random_score'
        partner_categories: ['id']

  it 'uses 3 primary and 3 secondary if available', ->
    primary = [fabricate('partner', id: 'primary_1'), fabricate('partner', id: 'primary_2'), fabricate('partner', id: 'primary_3'), fabricate('partner', id: 'primary_4')]
    secondary = [fabricate('partner', id: 'secondary_1'), fabricate('partner', id: 'secondary_2'), fabricate('partner', id: 'secondary_3'), fabricate('partner', id: 'secondary_4')]
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category'
    carousel.fetch().then ->
      carousel.partners.length.should.eql 6
      _.each carousel.partners.slice(0, 3), (partner) ->
        partner.id.should.containEql 'primary'
      _.each carousel.partners.slice(3, 6), (partner) ->
        partner.id.should.containEql 'secondary'

  it 'uses more secondary if fewer primary are available', ->
    primary = [fabricate('partner', id: 'primary_1'), fabricate('partner', id: 'primary_2')]
    secondary = [fabricate('partner', id: 'secondary_1'), fabricate('partner', id: 'secondary_2'), fabricate('partner', id: 'secondary_3'), fabricate('partner', id: 'secondary_4')]
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category'
    carousel.fetch().then ->
      carousel.partners.length.should.eql 6
      _.each carousel.partners.slice(0, 2), (partner) ->
        partner.id.should.containEql 'primary'
      _.each carousel.partners.slice(2, 6), (partner) ->
        partner.id.should.containEql 'secondary'

  it 'uses more primary if fewer secondary are available', ->
    primary = [fabricate('partner', id: 'primary_1'), fabricate('partner', id: 'primary_2'), fabricate('partner', id: 'primary_3'), fabricate('partner', id: 'primary_4')]
    secondary = [fabricate('partner', id: 'secondary_1'), fabricate('partner', id: 'secondary_2')]
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category'
    carousel.fetch().then ->
      carousel.partners.length.should.eql 6
      _.each carousel.partners.slice(0, 4), (partner) ->
        partner.id.should.containEql 'primary'
      _.each carousel.partners.slice(4, 6), (partner) ->
        partner.id.should.containEql 'secondary'

  it 'uses all available partners if total partners < 6', ->
    primary = [fabricate('partner', id: 'primary_1')]
    secondary = [fabricate('partner', id: 'secondary_1'), fabricate('partner', id: 'secondary_2')]
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category'
    carousel.fetch().then ->
      carousel.partners.length.should.eql 3
      _.each carousel.partners.slice(0, 1), (partner) ->
        partner.id.should.containEql 'primary'
      _.each carousel.partners.slice(1, 3), (partner) ->
        partner.id.should.containEql 'secondary'