_ = require 'underscore'
Q = require 'bluebird-q'
Partners = require '../../../../collections/partners.coffee'
template = -> require('../partner_cell_carousel/template.jade') arguments...

module.exports = ->
  partners = new Partners

  Q.promise (resolve, reject) ->
    $.get '/geo/nearest', ({ name, latitude, longitude }) ->
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
          ($el = $('<div class="partner-category-carousel"></div>'))
            .html template
              title: "Featured Galleries near #{name}"
              partners: partners.models

          resolve $el

        .catch reject
        .done()
