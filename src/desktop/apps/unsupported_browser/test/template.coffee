_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
sd = require('sharify').data
cheerio = require 'cheerio'
uaParser = require 'ua-parser'

render = ->
  filename = path.resolve __dirname, "../template.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Unsupported Browser', ->

  beforeEach ->
    @ua = uaParser.parseUA 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1)'
    @sd =
      CSS_EXT: '.css'
      BROWSER: @ua
      UNSUPPORTED_BROWSER_REDIRECT: '/artwork/matthew-abbott-lobby-and-supercomputer'
    @html = render()({
      sd: @sd
      asset: (->)
    })

  it 'renders a message for the unsupported browser', ->
    $ = cheerio.load @html
    @html.should.containEql "#{@ua.family} #{@ua.major} is not supported."
    @html.should.containEql 'Please update your browser.'

  it 'renders a form to continue with the bad browser anyway', ->
    $ = cheerio.load @html
    $("form").attr('method').should.equal 'post'
    $('button.unsupported-browser-submit').text().should.equal "Continue with #{@ua.family} #{@ua.major}"

  it 'renders a hidden input to post the forward url', ->
    $ = cheerio.load @html
    $("input[type='hidden']").attr('name').should.equal 'redirect-to'
    $("input[type='hidden']").attr('value').should.equal @sd.UNSUPPORTED_BROWSER_REDIRECT

  it 'renders links to upgrade options', ->
    $ = cheerio.load @html
    $("a[href*='microsoft']").should.have.lengthOf 1
    $("a[href*='safari']").should.have.lengthOf 1
    $("a[href*='chrome']").should.have.lengthOf 1
    $("a[href*='firefox']").should.have.lengthOf 1

  it 'excludes common JS to avoid errors in bad browsers', ->
    $ = cheerio.load @html
    $('script').should.have.lengthOf 0
