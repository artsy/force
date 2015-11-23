Q = require 'bluebird-q'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
PartnerShow = require '../../models/partner_show'
metaphysics = require '../../lib/metaphysics'
DateHelpers = require '../../components/util/date_helpers.coffee'
ViewHelpers = require './helpers/view_helpers.coffee'

@index = (req, res, next) ->
  metaphysics '
    query($id: String!) {
      partner_show(id: $id) {
        start_at
        end_at
        name
        displayable
        partner {
          id
          href
          name
          profile {
            id
            href
          }
        }
        fair {
          id
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
          carousel_image: resized(height: 300, version: "large") {
            width
            height
            url
          }
          caption
        }
      }
    }
  ', id: req.params.id
    .then (data) ->
      res.locals.sd.PARTNER_SHOW = data.partner_show #bootstrap
      res.locals.ViewHelpers = ViewHelpers
      res.locals.DateHelpers = DateHelpers
      res.locals.jsonLD = ViewHelpers.toJSONLD data.partner_show
      res.render 'index', data
    .catch (err) ->
      console.log err
      next err
    .done()