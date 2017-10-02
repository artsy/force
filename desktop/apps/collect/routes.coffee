qs = require 'qs'
Q = require 'bluebird-q'
_ = require 'underscore'
Backbone = require 'backbone'
JSONPage = require '../../components/json_page'
page = new JSONPage name: 'browse-categories'
GeocodedCities = require '../../collections/geocoded_cities'

@index = (req, res, next) ->
  geocodedCities = new GeocodedCities()
  Q.all([
    geocodedCities.fetch()
    page.get()
  ]).spread (geocodedCities, pageData) ->
    res.locals.sd.CATEGORIES = pageData
    res.locals.sd.GEOCODED_CITIES = geocodedCities
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
