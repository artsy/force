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

  beforeEach ->
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

  after ->
    benv.teardown()

  afterEach ->
    Backbone.sync.restore()

  it 'has correct params for gallery', ->

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

  it 'has correct params for institution', ->

    carousel = new CategoryCarousel category: new PartnerCategory id: 'id', name: 'Category', category_type: 'Institution'
    carousel.fetch().then ->
      Backbone.sync.args[0][2].data.should.eql
        cache: true
        eligible_for_primary_bucket: true
        has_full_profile: true
        size: 9
        sort: '-random_score'
        type: 'PartnerInstitution'
        partner_categories: ['id']

      Backbone.sync.args[1][2].data.should.eql
        cache: true
        eligible_for_secondary_bucket: true
        has_full_profile: true
        size: 9
        sort: '-random_score'
        type: 'PartnerInstitution'
        partner_categories: ['id']

      carousel.partners.length.should.eql 9