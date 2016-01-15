Q = require 'bluebird-q'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
PartnerShow = require '../../models/partner_show'
metaphysics = require '../../lib/metaphysics'
DateHelpers = require '../../components/util/date_helpers.coffee'
ViewHelpers = require './helpers/view_helpers.coffee'

@index = (req, res, next) ->
  metaphysics
    variables: id: req.params.id
    query: '
      query($id: String!) {
        partner_show(id: $id) {
          _id
          id
          start_at
          end_at
          name
          displayable
          press_release(format: markdown)
          description
          status
          href
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
            is_linkable
            profile {
              id
              href
            }
          }
          fair {
            id
            _id
            published
            has_full_feature
            name
            href
            start_at
            end_at
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
            href
            image {
              url(version: "large")
              width
              height
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
          }
          artists {
            id
            name
            href
            image {
              url(version: "large")
            }
          }
          cover_image {
            meta_image_url: url(version: "large")
          }
          install_shots: images {
            carousel_dimension: resized(height: 300, version: "large") {
              width
            }
            url(version: "larger")
            caption
          }
        }
      }
    '
  .then (data) ->
    res.locals.sd.PARTNER_SHOW = data.partner_show #bootstrap
    res.locals.ViewHelpers = ViewHelpers
    res.locals.DateHelpers = DateHelpers
    res.locals.jsonLD = ViewHelpers.toJSONLD data.partner_show
    data.artworkColumns = ViewHelpers.groupByColumnsInOrder(data.partner_show.artworks)
    res.render 'index', data
  .catch ->
    next()
