_        = require 'underscore'
sd       = require('sharify').data
Backbone = require 'backbone'
Partners = require '../../collections/partners'

@index = (req, res) ->
  galleries = new Partners([], { models: [] })
  options =
    data:
      size: 20
      active: true
      type: "PartnerGallery"
      sort: "sortable_id"
      has_full_profile: true
    url: "#{sd.API_URL}/api/v1/partners"
    cache: true
    success: ->
      aToZGroup = galleries.groupByAlphaWithColumns 3
      res.render 'template',
        aToZGroup   : aToZGroup
        partnerCount: galleries.length
  galleries.fetchUntilEnd options
