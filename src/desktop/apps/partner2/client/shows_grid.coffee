_ = require 'underscore'
Backbone = require 'backbone'
{ PartnerShows } = require '../../../collections/partner_shows'
template = -> require('../templates/shows_grid.jade') arguments...
showFiguresTemplate = -> require('../templates/show_figures.jade') arguments...

#
# Partner shows grid view
#
# Display different stages of partner shows (i.e. featured, current,
# upcoming, and past) in a grid layout.
# Used in overview and shows tab of partner galleries, overview tab
# of nonpartner galleries, and shows tab of institutions.
# Will hide itself if there is no shows.
module.exports = class PartnerShowsGridView extends Backbone.View

  defaults:
    numberOfFeatured: 1     # number of featured shows needed
    isCombined: false       # if combining current, upcoming and past shows
    numberOfShows: Infinity # number of combined shows needed
    heading: ''
    seeAll: true

  events:
    'click .js-partner-shows-more' : 'maybeFetchAndRenderShows'

  initialize: (options={}) ->
    { @partner, @numberOfFeatured, @numberOfShows, @isCombined, @heading, @seeAll } = _.defaults options, @defaults
    @page = 1

  startUp: -> @initializeShows()

  renderShows: (featured = [], current = [], upcoming = [], past = []) ->
    numberOfAllShows = _.reduce(arguments, ( (m, n) -> m + n.length ), 0)
    return @remove() if numberOfAllShows is 0

    @ensurePosterImages featured.concat current, upcoming, past
    @$el.html template
      partner: @partner
      heading: @heading
      seeAll: @seeAll
      isCombined: @isCombined
      featured: featured[0]
      current: current
      upcoming: upcoming
      past: past

    if numberOfAllShows == featured.length # lonely featured show
      @$('.partner2-shows-section.featured').addClass('lonely')

    $name = @$('.partner2-shows-section.featured .partner2-show-name')
    return unless $name.length > 0

    # Truncate with ellipsis for long titles (usually lots of artist names)
    $name.dotdotdot({ height: 250 }) if $name.height() > 250

    # Some featured names are long with no spaces... step down the font size
    # Break the word if the size is going to be too small to look like a title
    _.defer ->
      $name.css('visibility', 'hidden')
      min = 24
      while $name[0].scrollWidth > $name.width()
        size = Math.max(min, parseInt($name.css('font-size')) - 2)
        $name.css('font-size', "#{size}px")
        if size is min then $name.css('word-wrap', 'break-word'); break
      $name.css('visibility', 'visible')

  initializeShows: ->
    partnerShows = new PartnerShows()
    partnerShows.url = "#{@partner.url()}/shows"
    partnerShows.fetch
      data: { sort: "-featured,-end_at", size: 100, page: @page }
      success: =>
        @page = @page + 1
        featured = if partnerShows.featured() && @numberOfFeatured is 1 then [partnerShows.featured()] else []
        exclude = if featured then featured else []
        current = partnerShows.current(exclude).models
        upcoming = partnerShows.upcoming(exclude).models
        past = partnerShows.past(exclude).models

        # Save the remaining shows so we can potentially save a fetch later
        @remainingCurrent = current.slice(30)
        @remainingUpcoming = upcoming.slice(30)
        @remainingPast = past.slice(30)

        if @isCombined
          # order of getting combined shows: current -> upcoming -> past
          shows = current.concat(upcoming, past).slice(0, @numberOfShows)
          return @renderShows featured, shows
        else
          return @renderShows featured, current, upcoming, past

  maybeFetchAndRenderShows: (e) ->
    type = e.currentTarget.getAttribute 'data-show-type-id'
    $(e.currentTarget).remove()
    $(".#{type} .loading-spinner").show()
    shows = @getRemainingShows type

    # Try and fetch more shows if there are less than 30
    getMoreShows = if shows.length < 30
      moreShows = new PartnerShows()
      moreShows.url = "#{@partner.url()}/shows"
      moreShows.fetch
        data: { sort: "-featured,-end_at", size: 100, page: @page }
        success: =>
          @page = @page + 1
          # Update all the show types since we are fetching anyway
          @remainingCurrent = @remainingCurrent.concat moreShows.current().models
          @remainingUpcoming = @remainingUpcoming.concat moreShows.upcoming().models
          @remainingPast = @remainingPast.concat moreShows.past().models
          shows = @getRemainingShows type #get updated shows list from fetch
    else
      Promise.resolve()

    getMoreShows.then =>
      $(".#{type} .loading-spinner").remove()
      $(".#{type} .partner2-shows-container").append showFiguresTemplate
        shows: shows
        type: type
        isFeatured: false
      @sliceRemaining type

  getRemainingShows: (type) ->
    switch type
      when 'current' then @remainingCurrent
      when 'upcoming' then @remainingUpcoming
      when 'past' then @remainingPast
      else []

  sliceRemaining: (type) ->
    switch type
      when 'current' then @remainingCurrent = @remainingCurrent.slice(30)
      when 'upcoming' then shows = @remainingUpcoming = @remainingUpcoming.slice(30)
      when 'past' then shows = @remainingPast = @remainingPast.slice(30)

  ensurePosterImages: (shows) ->
    _.each shows, (show) =>
      @listenTo show, "fetch:posterImageUrl", (url) =>
        @renderShowPosterImage(show, url)

  renderShowPosterImage: (show, imageUrl) ->
    $coverImage = @$(".partner2-show[data-show-id='#{show.get('id')}'] .partner2-show-cover-image")
    $coverImage.css "background-image": "url(#{imageUrl})"
    $coverImage.find("> img").attr src: imageUrl
