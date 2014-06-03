_               = require 'underscore'
benv            = require 'benv'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ AToZ }        = require 'artsy-backbone-mixins'
{ fabricate }   = require 'antigravity'
Fair            = require '../../../../../models/fair'
Profile         = require '../../../../../models/profile'
Partners        = require '../../../../../collections/partners'
cheerio         = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Browse templates', ->

  describe 'a-to-z-lists', ->

    before ->
      m1 = fabricate('partner', artworks_count: 1)
      m2 = fabricate('partner', artworks_count: 0)

      exhibitorsAToZGroup = new Partners([ m1, m2 ])

      fair = new Fair (fabricate 'fair', about: 'about the fair')
      profile = new Profile (fabricate 'fair_profile')

      @template = render('template')
        sd: {}
        fair: fair
        profile: profile
        exhibitorsAToZGroup : exhibitorsAToZGroup.groupByAlphaWithColumns(3)

    it 'renders without errors', ->
      $ = cheerio.load @template
      $('.fair-exhibitors-list').length.should.equal 1
      $('.fair-exhibitors-list a').length.should.equal 1
      $('.fair-exhibitors-list .a-to-z-item').length.should.equal 2
      @template.should.include '/the-armory-show/browse/booths'
