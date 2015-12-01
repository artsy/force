_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Partners = require '../../../../collections/partners.coffee'

module.exports = (type) ->
  partners = new Partners

  Q.promise (resolve, reject) ->
    $.get '/geo/nearest', ({ name, latitude, longitude }) ->
      typeName = if type is 'gallery' then 'Galleries' else 'Institutions'
      category = new Backbone.Model name: "Featured #{typeName} near #{name}"

      partnerType = if type is 'gallery' then 'PartnerGallery' else 'PartnerInstitution'

      Q(
        partners.fetch data:
          active: true
          has_full_profile: true
          near: "#{latitude},#{longitude}"
          sort: '-random_score'
          size: 6
          type: partnerType
      )
        .then ->
          Q.all _.flatten partners.map (partner) -> [
            partner.related().profile.fetch()
            partner.related().locations.fetch()
          ]

        .then ->
          partners.reset partners.shuffle()
          resolve
            category: category
            partners: partners

        .catch reject
        .done()
