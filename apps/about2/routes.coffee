_ = require 'underscore'
Page = require '../../models/page'
$ = require 'cheerio'

pageToLocals = ($el) ->
  locals =
    heroTitle: $el.find('h1').html()
    heroImageUrls: $el.find('p').first().find('img').map(-> $(this).attr('src')).toArray()
    sections: $el.find('h2').map(-> $(this).html()).toArray()
  console.log locals
  locals

@index = (req, res) ->
  new Page(id: 'about2').fetch
    cache: true
    error: res.backboneError
    success: (page) ->
      $el = $ "<div></div>"
      $el.html page.mdToHtml('content')
      res.render 'index', pageToLocals($el)