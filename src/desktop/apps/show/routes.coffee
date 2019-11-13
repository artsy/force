{ NODE_ENV } = require '../../config'
{ stringifyJSONForWeb } = require '../../components/util/json'
PartnerShow = require '../../models/partner_show'
metaphysics = require '../../../lib/metaphysics'
DateHelpers = require '../../components/util/date_helpers'
ViewHelpers = require './helpers/view_helpers'

query = """
  query ShowMetadataQuery($id: String!) {
    partner_show(id: $id) {
      _id
      id
      created_at
      start_at
      end_at
      name
      displayable
      has_location
      press_release(format: HTML)
      description
      status
      href
      counts {
        artworks
        eligible_artworks
      }
      events {
        description
        title
        start_at
        end_at
        event_type
      }
      partner {
        id
        _id
        href
        name
        type
        is_linkable
        default_profile_id
      }
      fair {
        id
        _id
        profile {
          is_published
        }
        published
        has_full_feature
        name
        href
        start_at
        end_at
        location {
          coordinates {
            lat
            lng
          }
          display
          city
          state
          postal_code
          country
          address
          address_2
        }
      }
      location {
        coordinates {
          lat
          lng
        }
        display
        city
        state
        postal_code
        country
        address
        address_2
        day_schedules {
          start_time
          end_time
          day_of_week
        }
      }
      artworks {
        id
        _id
        __id
        href
        collecting_institution
        image {
          url(version: "large")
          width
          height
          aspect_ratio
          placeholder
        }
        partner {
          href
          id
          type
          name
        }
        artists {
          public
          href
          name
        }
        date
        title
        sale_message
        is_inquireable
      }
      artists {
        id
        name
        href
        image {
          url(version: "large")
        }
      }
      meta_image {
        meta_image_url: url(version: "larger")
        meta_thumb_url: url(version: "medium")
      }
      install_shots: images(default: false) {
        carousel_dimension: resized(height: 300, version: "large") {
          width
        }
        url(version: "larger")
        caption
      }
    }
  }
"""

@index = (req, res, next) ->
  send = query: query, variables: req.params

  return if metaphysics.debug req, res, send

  metaphysics send
    .then (data) ->
      res.locals.sd.PARTNER_SHOW = data.partner_show # bootstrap
      res.locals.sd.INCLUDE_SAILTHRU = res.locals.sd.PARTNER_SHOW?
      res.locals.ViewHelpers = ViewHelpers
      res.locals.DateHelpers = DateHelpers
      res.locals.jsonLD = JSON.stringify ViewHelpers.toJSONLD data.partner_show if data.partner_show.has_location
      data.artworkColumns = ViewHelpers.groupByColumnsInOrder(data.partner_show.artworks)
      res.render 'index', data
    .catch next
