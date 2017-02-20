Backbone = require 'backbone'

module.exports = class FilterView extends Backbone.View

  events:
    'click nav a': 'triggerArtworkFilter'
    'click .filter-dropdown': 'onFilterTriggerClick'

  sortHash:
    'artist-a-to-z': (a) ->
      a.related().artist.get('sortable_id')
    'most-bids': (a) ->
      - a.related().saleArtwork.get('bidder_positions_count')
    'least-bids': (a) ->
      a.related().saleArtwork.get('bidder_positions_count')
    'highest-current-bid': (a) ->
      - a.related().saleArtwork.get('highest_bid_amount_cents')
    'lowest-current-bid': (a) ->
      a.related().saleArtwork.get('highest_bid_amount_cents')

  initialize: (options) ->
    @artworks = options.artworks
    @on 'doneFetching', =>
      @sortArtworks options.startingSort

  triggerArtworkFilter: (event) ->
    $link = $(event.target)
    return false if $link.is '.is-active'
    @$('nav a.is-active').removeClass 'is-active'
    $link.addClass 'is-active'
    @sortArtworks $(event.target).data 'val'
    false

  sortArtworks: (sortId) ->
    return unless @sortHash[sortId]
    @artworks.comparator = @sortHash[sortId]
    @artworks.sort()
    @artworks.trigger 'filterSort'

  onFilterTriggerClick: (event) ->
    $dropdown = @$('.filter-dropdown')

    # Is there another active dropdown?
    for activeDropdown in @$('.filter-dropdown.is-active')
      $activeDropdown = $(activeDropdown)
      if $activeDropdown.data('group') isnt $dropdown.data('group')
        $activeDropdown.removeClass 'is-active'
    $dropdown.toggleClass 'is-active'
    false
