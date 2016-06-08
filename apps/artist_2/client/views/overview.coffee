_ = require 'underscore'
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
# Sub-header
RelatedGenesView = require '../../../../components/related_links/types/artist_genes.coffee'
# Bottom sections
RelatedArticlesView = require '../../../../components/related_articles/view.coffee'
RelatedShowsView = require '../../../../components/related_shows/view.coffee'
ArtistFillwidthList = require '../../../../components/artist_fillwidth_list/view.coffee'
initWorksSection = require '../../components/works_section/index.coffee'
FollowButton = require '../../../../components/follow_button/view.coffee'
splitTest = require '../../../../components/split_test/index.coffee'
viewHelpers = require '../../view_helpers.coffee'
gradient = require '../../../../components/gradient_blurb/index.coffee'
template = -> require('../../templates/sections/overview.jade') arguments...
showHighlightsTemplate = -> require('../../templates/sections/exhibition_highlights.jade') arguments...
renderRail = require '../../components/rail/index.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require '../../queries/overview.coffee'

module.exports = class OverviewView extends Backbone.View
  subViews: []
  fetches: []

  initialize: ({ @user, @statuses }) ->
    @listenTo this, 'artist:overview:sync', @renderRelated

  fetchRelated: ->
    metaphysics
      query: query
      variables:
        artist_id: @model.get('id')
        artists: @statuses.artists
        articles: @statuses.articles
        shows: @statuses.shows
    .then ({ artist }) => @trigger 'artist:overview:sync', artist

  setupBlurb: ->
    gradient $('.artist-overview-header'),
      limit: 170,
      label: 'Read More',
      heightBreakOffset: 20
      onClick: => @sticky.rebuild()
    _.defer =>
      @$('.artist-blurb').addClass('is-fade-in')
      @$('.artist-exhibition-highlights').addClass 'is-fade-in'

  renderRelated: (artist) =>
    artist.shows = _.sortBy artist.shows, 'end_at'
    @renderRails artist
    @renderExhibitionHighlights artist.shows

  renderRails: (artist) =>
    following = @following
    if artist.counts.shows <= 15
      $('.artist-related-rail[data-id=shows] .artist-related-rail__header h1').text ('Shows on Artsy')
    baseHref = @model.href()
    @$('.artist-related-rail').map ->
      section = ($el = $(this)).data('id')
      items = artist[section]
      count = artist.counts[section]
      return if not items
      renderRail _.extend $el: $el.find('.js-artist-rail'), { section, count, items, following, baseHref }

  renderExhibitionHighlights: (shows) ->
    return if not @statuses.shows
    $el = @$('.artist-overview-header .artist-exhibition-highlights')
    # If there are more than 15 shows, take ten and show a 'see more' link
    # If there are less than 15 shows, show them all.
    showMore = shows.length > 15
    if showMore
      highlights = _.take shows, 10
    else
      solo = []
      group = []
      fair = []
      shows = _.each _.take(shows, 15), (show) ->
        if show.fair
          fair.push show
        else if show.artists.length > 1
          group.push show
        else
          solo.push show
    shows = { highlights, solo, group, fair }
    options = { @model, @statuses, shows, viewHelpers }
    $el.html showHighlightsTemplate options

  postRender: ->
    # Sub-header
    @setupRelatedGenes()
    # Main section
    { @filterView, @sticky } = initWorksSection
      el: @$('#artwork-section')
      model: @model
      allLoaded: =>
        @$('.artist-related-rail').addClass('is-fade-in')
    @subViews.push @filterView

  setupRelatedGenes: ->
    $el = @$('.artist-related-genes')

    subView = new RelatedGenesView(el: $el, id: @model.id)
    subView.collection.on 'sync', =>
      # Remove bisected header cell if empty (ie artist is missing some info)
      # so that the remaining cell doesn't have weird margins
      @$('.bisected-header-cell').each ->
        $el = $(this)
        $el.remove() if not $el.children().length

      @setupBlurb()
    @subViews.push subView

  render: ->
    # Template expects plain JSON, not a Backbone model.
    @$el.html template
      artist: @model.toJSON()
      viewHelpers: viewHelpers
      statuses: @statuses
    _.defer => @postRender()
    this

  remove: ->
    @filterView.artworks.off 'sync'
    _.invoke @subViews, 'remove'
