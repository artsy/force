_ = require 'underscore'
qs = require 'qs'
{ Partners } = require '../../../../../collections/partners'
{ Cities } = require '../../../../../components/partner_cities/index.coffee'

module.exports = class FilterPartners extends Partners

  sync: (method, collection, options) =>
    data = {
      default_profile_public: true
      eligible_for_listing: true
    }

    _.extend data, _.omit options.data, 'category', 'location', 'type'

    data.partner_categories = [options.data.category] if options.data.category

    city = _.findWhere Cities, slug: options.data.location if options.data.location
    data.near = city.coords.join (',') if city
    data.type = if options.data.type is 'gallery' then ['PartnerGallery'] else ['PartnerInstitution', 'PartnerInstitutionalSeller']
    options.data = decodeURIComponent qs.stringify(data, { arrayFormat: 'brackets' })
    super
