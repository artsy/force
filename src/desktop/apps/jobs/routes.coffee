_ = require 'underscore'
JSONPage = require '../../components/json_page'
resizer = require '../../components/resizer'
markdown = require '../../components/util/markdown'
page = new JSONPage name: 'jobs'

@index = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    page.data.categories = _.groupBy page.data.jobs, 'category'
    res.render 'index', _.extend {}, page.data, resizer, markdown: markdown

@redirectJob = (req, res, next) ->
  res.redirect 301, req.url.replace 'job', 'jobs'
