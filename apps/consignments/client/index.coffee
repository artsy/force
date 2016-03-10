{ RECENTLY_SOLD } = require('sharify').data
Artworks = require '../../../collections/artworks.coffee'
TypeaheadView = require '../../../components/typeahead/view.coffee'
ArtworkRailView = require '../../../components/artwork_rail/client/view.coffee'

module.exports = ->
  # Typeaheads
  $('.js-typeahead').each (i) ->
    typeahead = new TypeaheadView
      kind: 'artists'
      autofocus: i is 0
      placeholder: 'Enter artist name'

    $(this).replaceWith typeahead.render().$el

    typeahead.on 'selected', (artist) ->
      if artist.get 'consignable'
        field = (name, val) ->
          $('<input>')
            .attr 'type', 'hidden'
            .attr 'name', name
            .val val

        $('.js-typeahead-form')
          .append field 'artist_id', artist.id
          .append field 'artist_name', artist.get 'name'
          .submit()

      else
        typeahead.message 'We’re not currently consigning works by this artist'

  # 'Recently Sold' rail
  artworks = new Artworks RECENTLY_SOLD
  rail = new ArtworkRailView
    el: $('.js-recently-sold-rail')
    collection: artworks
  rail.render()

  # Handle taps on 'In Demand' artist thumbs
  $('.js-in-demand-submit').click ->
    $(this).closest('form').submit()
