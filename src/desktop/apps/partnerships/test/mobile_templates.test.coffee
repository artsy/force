_ = require 'underscore'
$ = require 'cheerio'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
{ fabricate } = require '@artsy/antigravity'

render = (opts) ->
  filename = path.resolve __dirname, "../templates/mobile/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )(_.extend require('./fixture/content.json'), {
    sd: {}
    crop: ->
    asset: ->
    path: '/gallery-partnerships'
  }, opts)

describe 'Gallery partnerships templates', ->

  it 'shows the h1 header', ->
    $(render()).find('h1').html().should.equal 'Artsy for Galleries'

  it 'shows the h2 headers for each section', ->
    _.map($(render()).find('h2'), (x) -> $(x).html()).should.eql [
      'Network', 'Audience', 'Access',
      'Tools', 'Artsy Folio', 'Support'
    ]

  it 'shows the CTA in the apply section', ->
    $(render()).find('#apply .apply-button')
      .attr('href').should.equal 'https://www.artsy.net/apply/'
