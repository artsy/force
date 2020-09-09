Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
template = -> require('./template.jade') arguments...
metaphysics = require '../../../../../lib/metaphysics2.coffee'
ViewHelpers = require '../../helpers/view_helpers.coffee'
setupSaveControls = require '../save_artworks/index.coffee'

module.exports = class ArtworkColumnsView extends Backbone.View
  initialize: (options = {}) ->
    { @showId, @artworks, @endCursor } = options
    setupSaveControls @artworks
    $(window).on 'scroll.partner_show.artworks', _.throttle(@infiniteScroll, 150)

  fetch: =>
    @isFetching = true
    metaphysics
      variables: show_id: @showId, endCursor: @endCursor
      query: '
        query ($show_id: String!, $endCursor: String) {
          partner_show: show(id: $show_id) {
            artworksConnection(first: 25, after: $endCursor) {
              edges {
                node {
                  id: internalID
                  _id: slug
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
          }
        }
      '
    .then (data) =>
      artworksConnection = data.partner_show.artworksConnection
      fetchedArtworks = artworksConnection.edges.map (edge) -> edge.node
      if fetchedArtworks.length == 0
        $(window).off 'scroll.partner_show.artworks'
      else
        @endCursor = artworksConnection.pageInfo.endCursor
        @isFetching = false
        @artworks = @artworks.concat fetchedArtworks

        @render()


  infiniteScroll: =>
    return if @isFetching
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.artwork-column').last()
    @fetch() unless fold < $lastItem.offset()?.top + $lastItem.height()


  render: ->
    relatedArticlesHtml = @$('.js-related-articles').html()
    artworkColumns = ViewHelpers.groupByColumnsInOrder(@artworks)

    @$el.html template
      artworkColumns: artworkColumns
      ViewHelpers: ViewHelpers
      artworks: @artworks
      sd: sd
      onAppendArtworks: (appendArtworksToReactionGrid) =>
        @appendArtworksToReactionGrid = appendArtworksToReactionGrid

    @$('.artwork-column').first().prepend "<div class='js-related-articles'>#{relatedArticlesHtml}</div>"

    setupSaveControls @artworks

    this
