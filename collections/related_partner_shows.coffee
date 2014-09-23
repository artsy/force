_ = require 'underscore'
PartnerShows = require './partner_shows.coffee'
PartnerShow = require '../models/partner_show.coffee'

module.exports = class RelatedPartnerShows extends PartnerShows
  comparator: (show) ->
    -(show.getSortValue())

  parse: (response) ->
    _.filter response, (obj) ->
      show = new PartnerShow obj
      show.get('displayable') and
      # Remove shows without images
      show.imageUrlForMaxSize()? and
      # Remove closed shows in a fair
      not (show.get('status') is 'closed' and show.get('fair'))
