_ = require 'underscore'
Page = require '../../models/page'
$ = require 'cheerio'

pageToLocals = ($el) ->

  # Pluck out sections via h2s for nav & headers
  sections: $el.find('h2').map(-> $(this).html()).toArray()

  # Hero Unit
  heroTitle: $el.find('h1').html()
  heroImageUrls: $el.find('p').first().find('img')
    .map(-> $(this).attr('src')).toArray()

  # Section 1 (The Art World Online)
  section1Preamble: $el.find('h2').first().next('p').text()
  # "Our collection comes from leading..."
  section1PullBlurb1H1: $el.find('h3').first().text()
  section1PullBlurb1H2: $el.find('h3').first().next('p').text()
  section1Images1ImageUrls: $el.find('h3').first().next('p').next()
    .find('img').map(-> $(this).attr('src')).toArray()
  section1Images1Captions: _.filter($el.find('h3').first().next('p').next()
    .text().split('\n'), (txt) -> txt isnt '')
  # "We cover international show..."
  section1PullBlurb2H1: $el.find('h3').eq(1).text()
  section1PullBlurb2H2: $el.find('h3').eq(1).next('p').text()
  section1PullBlurb2P: $el.find('h3').eq(1).next('p').next('p').text()
  section1PullBlurb2RightImageUrls: $el.find('h3').eq(1).next('p').next('p')
    .nextUntil('hr', 'p').find('img').map(-> $(this).attr('src')).toArray()
  section1PullBlurb2RightImageAuthors: $el.find('h3').eq(1).next('p').next('p')
    .nextUntil('hr', 'h3').map(-> $(this).text()).toArray()
  section1PullBlurb2RightCaptions: $el.find('h3').eq(1).next('p').next('p')
    .nextUntil('hr', 'h3').next('p').map(-> $(this).text()).toArray()
  section1PullBlurb2LeftImageUrls: $el.find('hr').first().nextUntil('h3', 'p')
    .find('img').map(-> $(this).attr('src')).toArray()
  section1PullBlurb2LeftCaptions: _.filter($el.find('hr').first().nextUntil('h3', 'p')
    .text().split('\n'), (txt) -> txt isnt '')

@index = (req, res) ->
  new Page(id: 'about2').fetch
    cache: true
    error: res.backboneError
    success: (page) ->
      $el = $ "<div></div>"
      $el.html page.mdToHtml('content')
      res.locals.sd.CONTENT = page.mdToHtml('content')
      res.render 'index', pageToLocals($el)