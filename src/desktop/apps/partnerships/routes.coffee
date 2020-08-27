_ = require 'underscore'
knox = require 'knox'
url = require 'url'
JSONPage = require '../../components/json_page'
{ crop } = require '../../components/resizer'

@setSubject = (subject) -> (req, res, next) ->
  res.locals.subject = res.locals.sd.SUBJECT = subject
  next()

@index = (req, res, next) ->
  page = new JSONPage name: "#{res.locals.subject}-partnerships"
  page.get (err, data) ->
    return next err if err
    res.render 'index', _.extend data, crop: crop, path: req.url
