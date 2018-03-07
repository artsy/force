qs = require 'qs'
Q = require 'bluebird-q'
_ = require 'underscore'
Backbone = require 'backbone'
JSONPage = require '../../components/json_page'
page = new JSONPage name: 'browse-categories'
GeocodedCities = require '../../collections/geocoded_cities'
{ COLLECT_PAGE_TITLES_URL } = require('sharify').data
getCollectPageTitle = require '../../components/commercial_filter/page_title'
splitTest = require '../../components/split_test/index.coffee'

@index = (req, res, next) ->
  # MERCH_SORT_TEST remove after test closes
  splitTest('merch_sort_test').view()
  geocodedCities = new GeocodedCities()
  collectPageTitleFilters = new Backbone.Collection()
  Q.all([
    geocodedCities.fetch(cache: true)
    collectPageTitleFilters.fetch(cache: true, url: COLLECT_PAGE_TITLES_URL)
    page.get()
  ]).spread (geocodedCities, pageTitleFilters, pageData) ->
    res.locals.sd.CATEGORIES = pageData
    res.locals.sd.GEOCODED_CITIES = geocodedCities
    res.locals.sd.PAGE_TITLE_FILTERS = pageTitleFilters
    res.locals.sd.COLLECT_PAGE_TITLE = getCollectPageTitle(req.query, pageTitleFilters)
    res.render 'index'
  .catch next

@redirectBrowse = (req, res) ->
  query = req.query
  if req.query.dimension_range
    [min, max] = req.query.dimension_range.split('-')
    min = 1 if isNaN(min)
    query.width = query.height = "#{min}-#{max}"

  query = qs.stringify _.omit query, 'dimension_range', 'for_sale'
  res.redirect 301, "/collect?#{query}"

@categories = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.render 'categories',
      categoryMap: page.data
      hasResults: -> true
