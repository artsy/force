_ = require 'underscore'
JSONPage = require '../../components/json_page'
{ sortedNestedGroupByDate, sortedByDate } = require './util'

@pressReleases = (req, res, next) ->
  page = new JSONPage name: 'press-releases'
  page.get (err, data) ->
    return next err if err
    res.render 'press_releases/index', years: sortedNestedGroupByDate(page.data.items)

@inTheMedia = (req, res, next) ->
  page = new JSONPage name: 'in-the-media'
  page.get (err, data) ->
    return next err if err
    res.render 'in_the_media/index', items: sortedByDate(page.data.items)
