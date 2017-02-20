_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ resolve } = require 'path'
Article = require '../../../models/article'
Section = require '../../../models/section'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'article page', ->
  before ->
    @article = new Article require('./fixtures/article')
    _.extend @article.attributes, { section_ids: ['03434'] }
    _.extend @article.attributes,
      hero_section:
        type: 'fullscreen'
        background_url: 'http://video.mp4'

    @featuredArticles = new Articles
    @featuredArticles.model = Article
    @featuredArticles.add [_.extend(_.clone(fixtures.article), title: 'Featured Section Article Title')]

    @sectionArticles = new Articles
    @sectionArticles.model = Article
    @sectionArticles.add [_.extend(_.clone(fixtures.article), title: 'Section Article Title')]

    html = render('index')
      sd: {}
      resize: ->
      article: @article
      footerArticles: new Backbone.Collection
      featuredSection: new Section _.extend _.clone(fixtures.section), title: 'Moo Bar'
      featuredSectionArticles: @sectionArticles

    @$ = cheerio.load html

  it 'renders the headline', ->
    @$('h1').text().should.equal 'SPRING/BREAK Offers a Breath of Fresh Air for Weary Fairgoers'

  it 'renders the sections', ->
    @article.get('sections').should.have.lengthOf 12
    @$('.article-section').should.have.lengthOf 12

  it 'renders artworks', ->
    @$('.article-section-artworks').should.have.lengthOf 1
    @$('.article-section-artworks').html().should.containEql 'govinda-sah-azad-matter-slash-nothing-slash-matter'
    @$('.article-section-artworks').html().should.containEql 'https://d32dm0rphc51dk.cloudfront.net/UhkwvicwkJGgGoPIAP5pVA/larger.jpg'

  it 'can render artworks with two artists', ->
    @$('.article-section-artworks').html().should.containEql 'Govinda Sah'
    @$('.article-section-artworks').html().should.containEql 'Andy Warhol'
