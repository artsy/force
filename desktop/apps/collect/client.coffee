qs = require 'qs'
Backbone = require 'backbone'
Params = require '../../components/commercial_filter/models/params.coffee'
Filter = require '../../components/commercial_filter/models/filter.coffee'
UrlHandler = require '../../components/commercial_filter/url_handler.coffee'
PaginatorView = require '../../components/commercial_filter/filters/paginator/paginator_view.coffee'
HeadlineView = require '../../components/commercial_filter/views/headline/headline_view.coffee'
TotalView = require '../../components/commercial_filter/views/total/total_view.coffee'
SortView = require '../../components/commercial_filter/views/sort/sort_view.coffee'
CategoryFilterView = require '../../components/commercial_filter/filters/category/category_filter_view.coffee'
LocationFilterView = require '../../components/commercial_filter/filters/location/location_filter_view.coffee'
MediumFilterView = require '../../components/commercial_filter/filters/medium/medium_filter_view.coffee'
PeriodFilterView = require '../../components/commercial_filter/filters/period/period_filter_view.coffee'
FollowedArtistFilterView = require '../../components/commercial_filter/filters/followed_artists/followed_artist_filter_view.coffee'
PriceFilterView = require '../../components/commercial_filter/filters/price/price_filter_view.coffee'
ColorFilterView = require '../../components/commercial_filter/filters/color/color_filter_view.coffee'
SizeFilterView = require '../../components/commercial_filter/filters/size/size_filter_view.coffee'
KeywordFilterView = require '../../components/commercial_filter/filters/keyword/keyword_filter_view.coffee'
PillboxView = require '../../components/commercial_filter/views/pillbox/pillbox_view.coffee'
ArtworkColumnsView = require '../../components/artwork_columns/view.coffee'
CurrentUser = require '../../models/current_user.coffee'
scrollFrame = require 'scroll-frame'
sd = require('sharify').data
{ fullyQualifiedLocations } = require '../../components/commercial_filter/filters/location/location_map.coffee'

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

  totalView = new TotalView
    el: $('.cf-total-sort__total')
    filter: filter
    artworks: filter.artworks

  sortView = new SortView
    el: $('.cf-total-sort__sort')
    params: params

  if CurrentUser.orNull()?.hasLabFeature('Keyword Search')
    pillboxView = new PillboxView
      el: $('.cf-headline-container .cf-pillboxes')
      params: params
      artworks: filter.artworks
      categoryMap: sd.CATEGORIES

    keywordView = new KeywordFilterView
      el: $('.cf-keyword')
      params: params

  else
    categoryView = new CategoryFilterView
      el: $('.cf-categories')
      params: params
      aggregations: filter.aggregations
      categoryMap: sd.CATEGORIES

    pillboxView = new PillboxView
      el: $('.cf-right .cf-pillboxes')
      params: params
      artworks: filter.artworks
      categoryMap: sd.CATEGORIES

  # Main Artworks view
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
