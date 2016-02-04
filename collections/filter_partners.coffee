_ = require 'underscore'
qs = require 'qs'
Backbone = require 'backbone'
Partners = require '../collections/partners.coffee'
{ API_URL } = require('sharify').data
{ FeaturedCities } = require 'places'

module.exports = class FilterPartners extends Partners

  url: "#{API_URL}/api/v1/partners"

  sync: (method, collection, options) =>
    data = {
      default_profile_public: true
    }

    _.extend data, _.omit options.data, 'category', 'location', 'type'

    data.partner_categories = [options.data.category] if options.data.category

    city = _.findWhere FeaturedCities, slug: options.data.location if options.data.location
    data.near = city.coords.join (',') if city
    data.eligible_for_listing = true if options.data.type is 'gallery'
    data.type = if options.data.type is 'gallery' then ['PartnerGallery'] else ['PartnerInstitution', 'PartnerInstitutionalSeller']
    options.data = decodeURIComponent qs.stringify(data, { arrayFormat: 'brackets' })
    super

