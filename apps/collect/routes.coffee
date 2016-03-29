qs = require 'qs'
_ = require 'underscore'
Backbone = require 'backbone'
JSONPage = require '../../components/json_page'
page = new JSONPage name: 'browse-categories'

@index = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.locals.sd.CATEGORIES = data
    res.render 'index'

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
