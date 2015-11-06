{ API_URL } = require('sharify').data

module.exports =

  related: ->
    return @__related__ if @__related__?

    Partners = require '../../../collections/partners.coffee'

    partners = new Partners
    partners.url = "#{API_URL}/api/v1/partners?partner_categories=#{@get('id')}"

    @__related__ =
      partners: partners