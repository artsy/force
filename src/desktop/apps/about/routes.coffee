_ = require 'underscore'
cache = require '../../lib/cache'
resizer = require '../../components/resizer'
JSONPage = require '../../components/json_page'

@index = (req, res, next) ->
  return res.redirect '/buying-with-artsy' if res.locals.sd.IS_MOBILE
  page = new JSONPage name: 'about'
  page.get (err, data) ->
    return next err if err

    nav = _.keys(sections = data.sections).sort (a, b) ->
      sections[a].position > sections[b].position

    res.render 'index', _.extend {}, data, resizer, nav: nav
