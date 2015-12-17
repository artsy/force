Backbone = require 'backbone'
_ = require 'underscore'
template = -> require('./template.jade') arguments...
metaphysics = require '../../../../lib/metaphysics.coffee'
ViewHelpers = require '../../helpers/view_helpers.coffee'
setupSaveControls = require '../save_artworks/index.coffee'

module.exports = class ArtworkColumnsView extends Backbone.View

  initialize: (options = {}) ->
    { @page, @showId, @artworks } = options
    setupSaveControls @artworks
    $(window).on 'scroll.partner_show.artworks', _.throttle(@infiniteScroll, 150)

  fetch: =>
    metaphysics
      variables: show_id: @showId, page: @page
      query: '
        query($show_id: String!, $page: Int) {
          partner_show(id: $show_id) {
            artworks(page: $page) {
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
          }
        }
      '
    .then (data) =>
      fetchedArtworks = data.partner_show.artworks
      if fetchedArtworks.length == 0
        $(window).off 'scroll.partner_show.artworks'
      else
        @page++
        @artworks = @artworks.concat fetchedArtworks
        @render()

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.artwork-column').last()
    @fetch() unless fold < $lastItem.offset()?.top + $lastItem.height()

  render: ->
    relatedArticlesHtml = @$('.js-related-articles').html()
    artworkColumns = ViewHelpers.groupByColumnsInOrder(@artworks)
    @$el.html template
      artworkColumns: artworkColumns
      ViewHelpers: ViewHelpers
    @$('.artwork-column').first().prepend relatedArticlesHtml
    setupSaveControls @artworks
    this
