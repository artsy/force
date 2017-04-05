_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
{ AToZ, Fetch } = require 'artsy-backbone-mixins'
Partner = require '../models/partner'

module.exports = class Partners extends Backbone.Collection
  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Partner

  url: "#{API_URL}/api/v1/partners"

  @types:
    galleries: [
      'PartnerGallery'
    ]

    institutions: [
      'PartnerInstitution',
      'PartnerInstitutionalSeller'
    ]
