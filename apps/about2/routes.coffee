_ = require 'underscore'
Page = require '../../models/page'
$ = require 'cheerio'
fs = require 'fs'

@index = (req, res) ->
  new Page(id: 'about2').fetch
    cache: true
    error: res.backboneError
    success: (page) ->
      $el = $ "<div></div>"
      $el.html page.mdToHtml('content')
      res.locals.sd.CONTENT = page.mdToHtml('content')
      fs.readFile __dirname + '/content.json', (err, data) ->
        return next(err) if err
        res.render 'index', JSON.parse(data.toString())