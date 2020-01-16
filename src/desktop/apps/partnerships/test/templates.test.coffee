_ = require 'underscore'
$ = require 'cheerio'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require '@artsy/antigravity'

render = (opts) ->
  filename = path.resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )(_.extend require('./fixture/auction_content.json'), { sd: {}, asset: (->), crop: (->), subject: 'auction', path: '/auction-partnerships' }, opts)

describe 'Partnerships templates', ->

  it 'shows the h1 header', ->
    $(render()).find('h1').html().should.equal 'Artsy for Auctions'

  it 'shows the h2 headers for each section', ->
    _.map($(render()).find('h2'), (x) -> $(x).html()).should.eql [
      'Experience', 'Audience', 'Access',
      'Visibility', 'Event Services', 'Support'
    ]

  it 'shows the CTA in nav', ->
    $(render()).find('.partnerships-section-nav a:last-child')
      .attr('href').should.containEql '/apply'
