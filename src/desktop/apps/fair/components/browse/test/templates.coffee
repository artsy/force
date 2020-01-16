_ = require 'underscore'
_s = require 'underscore.string'
benv = require 'benv'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate, fabricate2 } = require '@artsy/antigravity'
Fair = require '../../../../../models/fair'
Profile = require '../../../../../models/profile'
Partners = require '../../../../../collections/partners'
cheerio = require 'cheerio'
FilterArtworks = require '../../../../../collections/filter_artworks'

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
      collection = new FilterArtworks fabricate2('filter_artworks'), parse: true
      
      @template = render('template')
        sd: {}
        fair: fair
        profile: profile
        exhibitorsAToZGroup: exhibitorsAToZGroup.groupByAlphaWithColumns(3)
        _: _
        _s: _s
        counts: collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../../../components/filter2/dropdown/label_map.coffee'

    it 'renders without errors', ->
      $ = cheerio.load @template
      $('.fair-exhibitors-list').length.should.equal 1
      $('.fair-exhibitors-list a').length.should.equal 1
      $('.fair-exhibitors-list .a-to-z-item').length.should.equal 2
      @template.should.containEql '/the-armory-show/browse/booths'
