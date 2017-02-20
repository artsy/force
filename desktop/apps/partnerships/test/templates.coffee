_ = require 'underscore'
$ = require 'cheerio'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
CurrentUser = require '../../../models/current_user'
{ fabricate } = require 'antigravity'

render = (opts) ->
  filename = path.resolve __dirname, "../templates/index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )(_.extend require('./fixture/content.json'), { sd: {}, asset: (->), crop: (->), subject: 'gallery', path: '/gallery-partnerships' }, opts)

describe 'Partnerships templates', ->

  it 'shows the h1 header', ->
    $(render()).find('h1').html().should.equal 'Artsy for Galleries'

  it 'shows the h2 headers for each section', ->
    _.map($(render()).find('h2'), (x) -> $(x).html()).should.eql [
      'Network', 'Audience', 'Access',
      'Tools', 'Artsy Folio', 'Support'
    ]

  it 'shows the CTA in nav', ->
    $(render()).find('.partnerships-section-nav a:last-child')
      .attr('href').should.containEql '/apply'

  xit 'shows the CTA in the apply section', ->
    $(render()).find('#apply .apply-button')
      .attr('href').should.equal '/apply'
