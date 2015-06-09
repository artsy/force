_ = require 'underscore'
Backbone = require 'backbone'
PartnerShows = require '../../../collections/partner_shows.coffee'
template = -> require('../templates/shows_grid.jade') arguments...

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
    numberOfFeatured: 1         # number of featured shows needed
    isCombined: false     # if combining current, upcoming and past shows
    numberOfShows: Infinity  # number of combined shows needed
    heading: ''
    seeAll: true

  events:
    'click .js-partner-shows-more' : 'maybeFetchAndRenderShows'

  initialize: (options={}) ->
    { @partner, @numberOfFeatured, @numberOfShows, @isCombined, @heading, @seeAll } = _.defaults options, @defaults
    @fetchAndRenderShows()

  renderShows: (featured=[], current=[], upcoming=[], past=[]) ->
    numberOfAllShows = _.reduce(arguments, ( (m, n) -> m + n.length ), 0)
    return @$el.hide() if numberOfAllShows is 0

    @ensurePosterImages featured.concat current, upcoming, past
    @$el.html template
      partner: @partner
      heading: @heading
      seeAll: @seeAll
      featured: featured[0]
      current: current
      upcoming: upcoming
      past: past

    if numberOfAllShows == featured.length # lonely featured show
      @$('.partner-shows-section.featured').addClass('lonely')

    $name = @$('.partner-shows-section.featured .partner-show-name')
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

  fetchAndRenderShows: (page=1)->
    partnerShows = new PartnerShows()
    partnerShows.url = "#{@partner.url()}/shows"
    partnerShows.fetch
      data: { sort: "-featured,-end_at", size: 100, page: page }
      success: =>
        featured = if partnerShows.featured() && @numberOfFeatured is 1 then [partnerShows.featured()] else []
        exclude = if featured then featured else []

        @current = partnerShows.current(exclude).models
        @upcoming = partnerShows.upcoming(exclude).models
        @past = partnerShows.past(exclude).models

        if @isCombined
          # order of getting combined shows: current -> upcoming -> past
          shows = @current.concat(@upcoming, @past).slice(0, @numberOfShows)
          return @renderShows featured, shows
        else
          return @renderShows featured, @current, @upcoming, @past

  maybeFetchAndRenderShows: ->
    console.log 'here?'
    $('.js-partner-shows-more').hide()
    $('.partner-shows-container').append 'Hello.'


  # xinitializeShows: (featured=[], current=[], upcoming=[], past=[], page=1, size=30) ->
  #   partnerShows = new PartnerShows()
  #   partnerShows.url = "#{@partner.url()}/shows"
  #   partnerShows.fetch
  #     data: { sort: "-featured,-end_at", page: page, size: size }
  #     success: =>
  #       console.log "Number of Featured: " + @numberOfFeatured
  #       console.log "featured.length: " + featured.length
  #       if @numberOfFeatured - featured.length > 0
  #         f = partnerShows.featured()
  #         featured.push f if f? # only add it if it's really something

  #       exclude = if f then [f] else []

  #       current = current.concat partnerShows.current(exclude).models
  #       upcoming = upcoming.concat partnerShows.upcoming(exclude).models
  #       past = past.concat partnerShows.past(exclude).models
  #       numberOfShowsSoFar = current.length + upcoming.length + past.length
  #       console.log "Current: " + current
  #       console.log "Upcoming: " + upcoming
  #       console.log "Past: " + past
  #       console.log "numberOfShowsSoFar: " + numberOfShowsSoFar
  #       console.log "@numberOfShows: " + @numberOfShows

  #       # Return
  #       if (numberOfShowsSoFar >= @numberOfShows and
  #          featured.length >= @numberOfFeatured) or
  #          partnerShows.length == 0
  #         console.log "numberOfShowsSoFar >= @numberOfShows: " + numberOfShowsSoFar >= @numberOfShows
  #         console.log "featured.length: " + featured.length
  #         console.log "numberOfFeatured: " + @numberOfFeatured
  #         console.log "partnerShows.length: " + partnerShows.length
  #         console.log "@isCombined: " + @isCombined
  #         if @isCombined

  #           # order of getting combined shows: current -> upcoming -> past
  #           shows = current.concat(upcoming, past).slice(0, @numberOfShows)
  #           console.log 'going to return at combined'
  #           return @renderShows featured, shows

  #         if (not @isCombined) or partnerShows.length == 0
  #           console.log 'going to return at not combined'
  #           return @renderShows featured, current, upcoming, past

  #       return @initializeShows featured, current, upcoming, past, ++page

  ensurePosterImages: (shows) ->
    _.each shows, (show) =>
      @listenTo show, "fetch:posterImageUrl", (url) =>
        @renderShowPosterImage(show, url)

  renderShowPosterImage: (show, imageUrl) ->
    $coverImage = @$(".partner-show[data-show-id='#{show.get('id')}'] .partner-show-cover-image")
    $coverImage.css "background-image": "url(#{imageUrl})"
    $coverImage.find("> img").attr src: imageUrl
