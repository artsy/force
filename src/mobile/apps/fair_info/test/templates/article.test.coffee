_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
Article = require '../../../../models/article'
Articles = require '../../../../collections/articles'
InfoMenu = require '../../info_menu.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'Article template', ->
  describe 'Article from writer', ->
    beforeEach ->
      filename = path.resolve __dirname, "../../templates/article.jade"
      @profile = new Profile fabricate 'profile'
      @fair = new Fair fabricate 'fair'
      @articles = new Articles [ new Article fabricate 'article' ]
      @infoMenu = new InfoMenu fair: @fair
      @infoMenu.infoMenu = {
        events: true,
        programming: true,
        artsyAtTheFair: false,
        aboutTheFair: false
      }

      @page = jade.compile(fs.readFileSync(filename), filename: filename) {
        profile: @profile
        fair: @fair
        article: @articles.first()
        infoMenu: @infoMenu.infoMenu
        sd: { FAIR: @fair, ARTICLE: @articles.first() }
      }

    it 'renders correctly', ->
      @page.should.containEql 'On The Heels of A Stellar Year in the West'
      @page.should.containEql 'fair-info-article-section-image'
      @page.should.containEql 'https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg'
      @page.should.containEql 'fair-info-article-section-text'


  describe 'without writer articles', ->
    beforeEach ->
      filename = path.resolve __dirname, "../../templates/article.jade"
      @profile = new Profile fabricate 'profile'
      @fair = new Fair fabricate 'fair'
      @infoMenu = new InfoMenu fair: @fair
      @infoMenu.infoMenu = {
        event: true,
        programming: false,
        artsyAtTheFair: false,
        aboutTheFair: false
      }

      @page = jade.compile(fs.readFileSync(filename), filename: filename) {
        profile: @profile
        fair: @fair
        infoMenu: @infoMenu.infoMenu
        sd: { FAIR: @fair }
      }
    it 'renders fallback correctly', ->
      @page.should.containEql 'About The Fair'
      @page.should.containEql 'fair-info2-content'
      @page.should.not.containEql 'On The Heels of A Stellar Year in the West'
