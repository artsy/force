qs = require 'querystring'
Backbone = require 'backbone'
Params = require '../../components/commercial_filter/models/params.coffee'
Filter = require '../../components/commercial_filter/models/filter.coffee'
UrlHandler = require '../../components/commercial_filter/url_handler.coffee'
PaginatorView = require '../../components/commercial_filter/filters/paginator/paginator_view.coffee'
HeadlineView = require '../../components/commercial_filter/views/headline/headline_view.coffee'
TotalView = require '../../components/commercial_filter/views/total/total_view.coffee'
SortView = require '../../components/commercial_filter/views/sort/sort_view.coffee'
CategoryFilterView = require '../../components/commercial_filter/filters/category/category_filter_view.coffee'
MediumFilterView = require '../../components/commercial_filter/filters/medium/medium_filter_view.coffee'
PriceFilterView = require '../../components/commercial_filter/filters/price/price_filter_view.coffee'
ColorFilterView = require '../../components/commercial_filter/filters/color/color_filter_view.coffee'
SizeFilterView = require '../../components/commercial_filter/filters/size/size_filter_view.coffee'
PillboxView = require '../../components/commercial_filter/views/pillbox/pillbox_view.coffee'
ArtworkColumnsView = require '../../components/artwork_columns/view.coffee'
Sticky = require '../../components/sticky/index.coffee'
sd = require('sharify').data

module.exports.init = ->
  # Set initial params from the url params
  params = new Params qs.parse(location.search.replace(/^\?/, ''))
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

  totalView = new SortView
    el: $('.cf-total-sort__sort')
    params: params

  pillboxView = new PillboxView
    el: $('.cf-pillboxes')
    params: params
    artworks: filter.artworks

  # Main Artworks view
  filter.artworks.on 'reset', ->
    artworkView = new ArtworkColumnsView
      collection: filter.artworks
      el: $('.cf-artworks')
      allowDuplicates: true
      gutterWidth: 30
      numberOfColumns: 3

  filter.on 'change:loading', ->
    $('.cf-artworks').attr 'data-loading', filter.get('loading')

  # Sidebar
  mediumsView = new MediumFilterView
    el: $('.cf-sidebar__mediums')
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
  params.on 'change', -> $('html,body').animate { scrollTop: 0 }, 400

  # Handles sticky sidebar
  @sticky = false
  filter.artworks.on 'reset zero:artworks', =>
    if @sticky
      _.delay (=> @sticky.rebuild()), 300
    else
      @sticky = new Sticky
      @sticky.add $('.cf-sidebar')


