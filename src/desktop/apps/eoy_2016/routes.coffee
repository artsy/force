qs = require 'qs'
JSONPage = require '../../components/json_page'
page = new JSONPage name: 'eoy_2016'

@index = (req, res, next) ->
  page.get (err, data) ->
    return next err if err
    res.render 'index',
      eoy_2016: page.data
