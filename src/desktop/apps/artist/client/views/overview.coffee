_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtworkFilterView = require '../../../../components/artwork_filter_2/view.coffee'
FollowButton = require '../../../../components/follow_button/view.coffee'
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
showHighlightsTemplate = -> require('../../templates/sections/exhibition_highlights.jade') arguments...
renderRail = require '../../components/rail/index.coffee'
metaphysics = require '../../../../../lib/metaphysics.coffee'
query = require '../../queries/overview.coffee'

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  # TODO: ARTIST_MARKET_DATA_TEST remove after test closes(@testGroup)
  initialize: ({ @user, @statuses, @testGroup }) ->
    @listenTo this, 'artist:overview:sync', @renderRelated

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        artists: @statuses.artists
        articles: @statuses.articles
        shows: @statuses.shows || @statuses.cv
        loggedOut: !@user
    .then ({ artist }) => @trigger 'artist:overview:sync', artist

  setupBlurb: ->
    gradient $('.artist-overview-header'),
      limit: 170,
      label: 'Read More',
      heightBreakOffset: 20
      onExpand: =>
        if @useNewArtworkFilter
          @filterView.sticky?.rebuild()
        else
          @sticky?.rebuild() # FIXME: Is this still needed?
    _.defer =>
      @$('.artist-blurb').addClass('is-fade-in')
      @$('.artist-exhibition-highlights').addClass 'is-fade-in'

  renderRelated: (artist) =>
    @renderRails artist
    @renderExhibitionHighlights artist

  renderRails: (artist) =>
    following = @following
    if artist.counts.shows <= 15
      $('.artist-related-rail[data-id=shows] .artist-related-rail__header h1').text ('Shows on Artsy')
    baseHref = @model.href()
    @$('.artist-related-rail').map ->
      section = ($el = $(this)).data('id')
      items = artist[section]
      items = _.where(items, { is_reference: false }) if section is 'shows'
      count = artist.counts[section]
      return if not items

      renderRail _.extend $el: $el.find('.js-artist-rail'), { section, count, items, following, baseHref }

  renderExhibitionHighlights: ({shows, counts}) ->
    return unless @statuses.shows || @statuses.cv
    $el = @$('.artist-overview-header .artist-exhibition-highlights')
    # If there are more than 15 shows, take ten and show a 'see more' link
    # If there are less than 15 shows, show them all, grouped by kind of show.
    showMore = counts.shows > 15
    if showMore
      highlights = viewHelpers.nShowsByDate(shows, 10)
    else
      { solo, group, fair } = _.groupBy(viewHelpers.nShowsByDate(shows, 15), 'kind')

    shows = { highlights, solo, group, fair }
    options = { @model, @statuses, shows, viewHelpers }
    $el.html showHighlightsTemplate options

  postRender: ->
    # Sub-header
    @setupRelatedGenes()

    # Main section
    @filterView = (new ArtworkFilterView
      el: @$('#artwork-section')
      artistID: @model.get('id')
      topOffset: $('.artist-tabs-container').height() + 20
      infiniteScrollEnabled: false
    ).render()

    @showRelatedRail()
    @subViews.push @filterView

  showRelatedRail: ->
    @$('.artist-related-rail').addClass('is-fade-in')


  setupRelatedGenes: ->
    subView = new RelatedGenesView
      id: @model.id

    @listenTo subView.collection, 'sync', =>
      artist = @model.toJSON()
      hasGenes = subView.collection.length
      hasShows = @statuses.shows || @statuses.cv
      hasMeta = viewHelpers.hasOverviewHeaderMeta(artist)

      if not (hasGenes or hasShows or hasMeta)
        $('.artist-overview-header').remove()
      else
        if hasGenes
          append = if hasShows then 'left' else 'right'
          $(".js-artist-overview-header-#{append}").append subView.render().$el

        # If one half of the bisected header is empty, remove it.
        @$('.bisected-header-cell').each ->
          $el = $(this)
          $el.remove() if not $el.children().length

      @setupBlurb()
    @subViews.push subView

  render: ->
    @$el.html template
      artist: @model.toJSON()
      viewHelpers: viewHelpers
      statuses: @statuses
      testGroup: @testGroup

    _.defer => @postRender()
    this

  remove: ->
    _.invoke @subViews, 'remove'
    super
