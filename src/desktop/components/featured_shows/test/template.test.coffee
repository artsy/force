_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
benv = require 'benv'
{ fabricate } = require '@artsy/antigravity'
PartnerShows = require '../../../collections/partner_shows'

render = (template) ->
  filename = path.resolve __dirname, "../#{template}.jade"
  jade.compile(fs.readFileSync(filename), filename: filename)

describe 'Featured Shows templates', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  it 'renders the template', ->
    shows = new PartnerShows _.times(4, -> fabricate('show'))
    $html = $(render('large')(shows: shows.models))
    $html.find('.featured-shows-featured-show').length.should.equal 4
    $html.find('.fsfs-running-dates').last().text().should.equal 'Jul 12 – Aug 23, 2013'

  it 'optionally displays the location', ->
    shows = new PartnerShows [fabricate 'show']
    $html = $(render('large')(shows: shows.models, displayLocation: true))
    $html.find('.fsfs-running-dates').last().text().should.containEql 'New York'

  describe 'relative date logic', ->
    it 'renders correctly', ->
      shows = new PartnerShows _.times(3, -> fabricate('show', status: 'closed'))
      shows.add fabricate 'show', status: 'running'
      shows.add fabricate 'show', status: 'upcoming'
      $html = $(render('large')(shows: shows.models))
      $html.find('.fsfs-running-dates').length.should.equal 4
      $($html.find('.featured-shows-featured-show').get(4)).html().should.containEql 'Opening Jul 12'
