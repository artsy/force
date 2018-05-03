Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
template = -> require('./template.jade') arguments...
metaphysics = require '../../../../../lib/metaphysics.coffee'
ViewHelpers = require '../../helpers/view_helpers.coffee'
setupSaveControls = require '../save_artworks/index.coffee'

module.exports = class ArtworkColumnsView extends Backbone.View
  initialize: (options = {}) ->
    { @page, @showId, @artworks } = options

    if !sd.ENABLE_EXPERIMENTAL_STITCH_INJECTION
      setupSaveControls @artworks

    $(window).on 'scroll.partner_show.artworks', _.throttle(@infiniteScroll, 150)

  fetch: =>
    @isFetching = true
    metaphysics
      variables: show_id: @showId, page: @page
      query: '
        query($show_id: String!, $page: Int) {
          partner_show(id: $show_id) {
            artworks(page: $page) {
              id
              _id
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
          }
        }
      '
    .then (data) =>
      fetchedArtworks = data.partner_show.artworks
      if fetchedArtworks.length == 0
        $(window).off 'scroll.partner_show.artworks'
      else
        @page++
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

    @$('.artwork-column').first().prepend "<div class='js-related-articles'>#{relatedArticlesHtml}</div>"

    if !sd.ENABLE_EXPERIMENTAL_STITCH_INJECTION
      setupSaveControls @artworks

    this
