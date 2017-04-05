qs = require 'qs'
Backbone = require 'backbone'
Params = require '../../components/commercial_filter/models/params'
Filter = require '../../components/commercial_filter/models/filter'
UrlHandler = require '../../components/commercial_filter/url_handler'
PaginatorView = require '../../components/commercial_filter/filters/paginator/paginator_view'
HeadlineView = require '../../components/commercial_filter/views/headline/headline_view'
TotalView = require '../../components/commercial_filter/views/total/total_view'
SortView = require '../../components/commercial_filter/views/sort/sort_view'
CategoryFilterView = require '../../components/commercial_filter/filters/category/category_filter_view'
LocationFilterView = require '../../components/commercial_filter/filters/location/location_filter_view'
MediumFilterView = require '../../components/commercial_filter/filters/medium/medium_filter_view'
PeriodFilterView = require '../../components/commercial_filter/filters/period/period_filter_view'
FollowedArtistFilterView = require '../../components/commercial_filter/filters/followed_artists/followed_artist_filter_view'
PopularArtistsView = require '../../components/commercial_filter/views/popular_artists/popular_artists_view'
PriceFilterView = require '../../components/commercial_filter/filters/price/price_filter_view'
ColorFilterView = require '../../components/commercial_filter/filters/color/color_filter_view'
SizeFilterView = require '../../components/commercial_filter/filters/size/size_filter_view'
KeywordFilterView = require '../../components/commercial_filter/filters/keyword/keyword_filter_view'
PillboxView = require '../../components/commercial_filter/views/pillbox/pillbox_view'
ArtworkColumnsView = require '../../components/artwork_columns/view'
CurrentUser = require '../../models/current_user'
scrollFrame = require 'scroll-frame'
sd = require('sharify').data
{ fullyQualifiedLocations } = require '../../components/commercial_filter/filters/location/location_map'

module.exports.init = ->
  # Set initial params from the url params
  paramsFromUrl = qs.parse(location.search.replace(/^\?/, ''))
  params = new Params paramsFromUrl,
    categoryMap: sd.CATEGORIES
    fullyQualifiedLocations: fullyQualifiedLocations
  filter = new Filter params: params

  headlineView = new HeadlineView
    el: $('.cf-headline')
    params: params

  categoryView = new CategoryFilterView
    el: $('.cf-categories')
    params: params
    aggregations: filter.aggregations
    categoryMap: sd.CATEGORIES

  totalView = new TotalView
    el: $('.cf-total-sort__total')
    filter: filter
    artworks: filter.artworks

  sortView = new SortView
    el: $('.cf-total-sort__sort')
    params: params

  popArtistsView = new PopularArtistsView
    el: $('.cf-artworks')
    artists: filter.popular_artists
    params: params

  pillboxView = new PillboxView
    el: $('.cf-pillboxes')
    params: params
    artworks: filter.artworks
    categoryMap: sd.CATEGORIES

  # Main Artworks view
  if CurrentUser.orNull()?.hasLabFeature('Keyword Search')
    keywordView = new KeywordFilterView
      el: $('.cf-keyword')
      params: params
      aggregations: filter.aggregations

  filter.artworks.on 'reset', ->
    artworkView = new ArtworkColumnsView
      collection: filter.artworks
      el: $('.cf-artworks')
      allowDuplicates: true
      gutterWidth: 30
      numberOfColumns: 3
      context_page: 'Collect page'

  filter.on 'change:loading', ->
    $('.cf-artworks').attr 'data-loading', filter.get('loading')

  # Sidebar
  mediumsView = new MediumFilterView
    el: $('.cf-sidebar__mediums')
    params: params
    aggregations: filter.aggregations

  periodsView = new PeriodFilterView
    el: $('.cf-sidebar__periods')
    params: params
    aggregations: filter.aggregations

  followedArtistsView = new FollowedArtistFilterView
    el: $('.cf-sidebar__followed_artists')
    params: params
    filter: filter

  locationsView = new LocationFilterView
    el: $('.cf-sidebar__locations')
    params: params
    aggregations: filter.aggregations

  priceView = new PriceFilterView
    el: $('.cf-sidebar__price')
    params: params

  colorView = new ColorFilterView
    el: $('.cf-sidebar__colors')
    params: params
    aggregations: filter.aggregations

  widthView = new SizeFilterView
    el: $('.cf-sidebar__size__width')
    attr: 'width'
    params: params

  heightView = new SizeFilterView
    el: $('.cf-sidebar__size__height')
    attr: 'height'
    params: params

  # bottom
  paginatorView = new PaginatorView
    el: $('.cf-pagination')
    params: params
    filter: filter

  # Update url when routes change
  urlHandler = new UrlHandler
    params: params

  Backbone.history.start pushState: true

  # Trigger one change just to render filters
  params.trigger 'change'

  # Whenever params change, scroll to the top
  params.on 'change', ->
    if _.keys(params.changedAttributes())[0] in ['major_periods', 'partner_cities', 'silent']
      delayedScroll()
    else
      $('html,body').animate { scrollTop: 0 }, 400

  # 1 second delay for checkbox selections
  timer = null
  delayedScroll = ->
    clearTimeout(timer)
    timer = setTimeout ->
      $('html,body').animate { scrollTop: 0 }, 400
    , 1000

  params.on 'change', ->
    analytics.track 'Commericial filter: params changed',
      current: params.whitelisted()
      changed: params.changedAttributes()
