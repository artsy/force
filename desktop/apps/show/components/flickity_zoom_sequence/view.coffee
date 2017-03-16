Backbone = require 'backbone'
_ = require 'underscore'
metaphysics = require '../../../../../lib/metaphysics.coffee'
initCarousel = require '../../../../components/merry_go_round/bottom_nav_mgr.coffee'
ViewHelpers = require '../../helpers/view_helpers.coffee'
template = -> require('../../templates/carousel.jade') arguments...
FlickityZoomSequence = require './index.coffee'

module.exports = class InstallShotsView extends Backbone.View

  initialize: (options = {}) ->
    { @page, @showId, @installShots } = options
    @fetch()

  fetch: ->
    metaphysics
      variables: show_id: @showId, page: @page
      query: '
        query($show_id: String!, $page: Int) {
          partner_show(id: $show_id) {
            install_shots: images(page: $page, default: false) {
              carousel_dimension: resized(height: 300, version: "large") {
                width
              }
              url(version: "larger")
              caption
            }
          }
        }
      '
    .then (data) =>
      if data.partner_show.install_shots.length > 0
        @installShots = @installShots.concat data.partner_show.install_shots
        @page++
        @fetch()
      else
        @render()

  render: ->
    @$el.html template
      ViewHelpers: ViewHelpers
      partner_show: install_shots: @installShots

    initCarousel @$el, {
      setGallerySize: false
      imagesLoaded: true
    }, (instance) ->

      seq = new FlickityZoomSequence instance.cells.flickity
      seq.bind()
