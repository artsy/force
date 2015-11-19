_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
Partners = require '../../../../collections/partners.coffee'

module.exports = ->
  partners = new Partners

  Q.promise (resolve, reject) ->
    $.get '/geo/nearest', ({ name, latitude, longitude }) ->
      category = new Backbone.Model name: "Featured Galleries near #{name}"

      Q(
        partners.fetch data:
          near: "#{latitude},#{longitude}"
          sort: '-random_score'
          size: 6
      )
        .then ->
          Q.all _.flatten partners.map (partner) -> [
            partner.related().profile.fetch()
            partner.related().locations.fetch()
          ]

        .then ->
          resolve
            category: category
            partners: partners

        .catch reject
        .done()
