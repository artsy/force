{ NODE_ENV } = require '../../config'
{ stringifyJSONForWeb } = require '../../components/util/json'
PartnerShow = require '../../models/partner_show'
metaphysics = require '../../../lib/metaphysics2'
DateHelpers = require '../../components/util/date_helpers'
ViewHelpers = require './helpers/view_helpers'

query = """
  query ShowMetadataQuery($id: String!) {
    partner_show: show(id: $id) {
      _id: internalID
      id: slug
      createdAt
      start_at: startAt
      end_at: endAt
      name
      displayable: isDisplayable
      has_location: hasLocation
      press_release: pressRelease(format: HTML)
      description
      status
      href
      counts {
        artworks
        eligible_artworks: eligibleArtworks
      }
      events {
        description
        title
        start_at: startAt
        end_at: endAt
        event_type: eventType
      }
      partner {
        ... on Partner {
          id: slug
          _id: internalID
          href
          name
          type
          is_linkable: isLinkable
          default_profile_id: defaultProfileID
        }
      }
      fair {
        id: slug
        _id: internalID
        profile {
          is_published: isPublished
        }
        published: isPublished
        has_full_feature: hasFullFeature
        name
        href
        start_at: startAt
        end_at: endAt
        location {
          coordinates {
            lat
            lng
          }
          display
          city
          state
          postal_code: postalCode
          country
          address
          address_2: address2
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
        postal_code: postalCode
        country
        address
        address_2: address2
        day_schedules: daySchedules {
          start_time: startTime
          end_time: endTime
          day_of_week: dayOfWeek
        }
      }
      artworksConnection(first: 25) {
        edges {
          node {
            id: slug
            _id: internalID
            __id: id
            href
            collecting_institution: collectingInstitution
            image {
              url(version: "large")
              width
              height
              aspect_ratio: aspectRatio
              placeholder
            }
            partner {
              href
              id
              type
              name
            }
            artists {
              public: isPublic
              href
              name
            }
            date
            title
            sale_message: saleMessage
            is_inquireable: isInquireable
          }
        }
        pageInfo {
          endCursor
        }
      }
      artists {
        id
        name
        href
        image {
          url(version: "large")
        }
      }
      meta_image: metaImage {
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
      artworksConnection = data.partner_show.artworksConnection
      artworks = artworksConnection.edges.map (edge) -> edge.node
      data.artworkColumns = ViewHelpers.groupByColumnsInOrder(artworks)
      res.render 'index', data
    .catch next
