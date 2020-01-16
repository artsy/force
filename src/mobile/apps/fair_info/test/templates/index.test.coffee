_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
Article = require '../../../../models/article'
PartnerLocation = require '../../../../models/partner_location.coffee'
Articles = require '../../../../collections/articles'
InfoMenu = require '../../info_menu.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'Fair Information ', ->
  describe 'Fair with no articles ', ->
    beforeEach ->
      filename = path.resolve __dirname, "../../templates/index.jade"
      @profile = new Profile fabricate 'profile'
      @fair = new Fair fabricate 'fair'
      @articles = new Articles [ new Article fabricate 'article' ]
      @infoMenu = new InfoMenu fair: @fair
      @infoMenu.infoMenu = {
        events: true,
        programming: false,
        artsyAtTheFair: false,
        aboutTheFair: false
      }

      @page = jade.compile(fs.readFileSync(filename), filename: filename) {
        profile: @profile
        fair: @fair
        location: new PartnerLocation @fair.get('location')
        article: @articles.first()
        infoMenu: @infoMenu.infoMenu
        sd: { FAIR: @fair, PROFILE: @profile }
      }

    it 'renders fair information correctly', ->
      @page.should.containEql 'visitors'
      @page.should.containEql 'about the fair'
      @page.should.containEql 'events'

  describe 'Fair with articles ', ->
    beforeEach ->
      filename = path.resolve __dirname, "../../templates/index.jade"
      @profile = new Profile fabricate 'profile'
      @fair = new Fair fabricate 'fair'
      @articles = new Articles [ new Article fabricate 'article' ]
      @infoMenu = new InfoMenu fair: @fair
      @infoMenu.infoMenu = {
        events: true,
        programming: true,
        artsyAtTheFair: true,
        aboutTheFair: true
      }

      @page = jade.compile(fs.readFileSync(filename), filename: filename) {
        profile: @profile
        fair: @fair
        article: @articles.first()
        location: new PartnerLocation @fair.get('location')
        infoMenu: @infoMenu.infoMenu
        sd: { FAIR: @fair, PROFILE: @profile }
      }

    it 'renders fair information correctly', ->
      @page.should.containEql 'visitors'
      @page.should.containEql 'about the fair'
      @page.should.containEql 'events'
      @page.should.containEql 'artsy at the fair'
      @page.should.containEql 'programming'
