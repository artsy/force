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

  it 'fetches primary and secondary buckets for a gallery category', ->
    primary = [
      fabricate('partner', id: 'primary_1'),
      fabricate('partner', id: 'primary_2'),
      fabricate('partner', id: 'primary_3'),
      fabricate('partner', id: 'primary_4'),
      fabricate('partner', id: 'primary_5')
    ]
    secondary = [
      fabricate('partner', id: 'secondary_1'),
      fabricate('partner', id: 'secondary_2'),
      fabricate('partner', id: 'secondary_3'),
      fabricate('partner', id: 'secondary_4'),
      fabricate('partner', id: 'secondary_5')
    ]
    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', primary
      .returns Q.resolve primary
      .onCall 1
      .yieldsTo 'success', secondary
      .returns Q.resolve secondary

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category', category_type: 'Gallery'
    carousel.fetch().then ->
      Backbone.sync.args[0][2].data.should.eql
        cache: true
        eligible_for_primary_bucket: true
        has_full_profile: true
        size: 9
        sort: '-random_score'
        type: 'PartnerGallery'
        partner_categories: ['id']

      Backbone.sync.args[1][2].data.should.eql
        cache: true
        eligible_for_secondary_bucket: true
        has_full_profile: true
        size: 9
        sort: '-random_score'
        type: 'PartnerGallery'
        partner_categories: ['id']

      carousel.partners.length.should.eql 9

  describe 'institutions', ->

    beforeEach ->
      partners = [
        fabricate('partner', id: 'partner_1'),
        fabricate('partner', id: 'partner_2'),
        fabricate('partner', id: 'partner_3'),
        fabricate('partner', id: 'partner_4'),
        fabricate('partner', id: 'partner_5'),
        fabricate('partner', id: 'partner_6'),
        fabricate('partner', id: 'partner_7'),
        fabricate('partner', id: 'partner_8'),
        fabricate('partner', id: 'partner_9'),
      ]

      sinon.stub Backbone, 'sync'
        .onCall 0
        .yieldsTo 'success', partners
        .returns Q.resolve partners

    it 'fetches partners without buckets for given category id', ->
      carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category', category_type: 'Institution'
      carousel.fetch().then ->
        Backbone.sync.args[0][2].data.should.eql
          cache: true
          has_full_profile: true
          size: 9
          type: 'PartnerInstitution'
          sort: '-random_score'
          partner_categories: ['id']

        carousel.partners.length.should.eql 9