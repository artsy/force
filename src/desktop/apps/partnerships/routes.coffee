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

@mktoABTest = (req, res) ->
  a = '/gallery-partnerships?utm_medium=email&utm_source=marketo&utm_campaign=seo-for-galleries&utm_content=partnerships-a'
  b = 'http://pages.artsy.net/gallery-partnerships.html?utm_medium=email&utm_source=marketo&utm_campaign=seo-for-galleries&utm_content=partnerships-b'
  res.redirect if Boolean(_.random 1) then a else b
