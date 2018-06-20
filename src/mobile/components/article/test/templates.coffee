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
    @article = new Article _.extend {}, fixtures.article,
      section_ids: ['03434']
      hero_section:
        type: 'fullscreen'
        background_url: 'http://video.mp4'

    @featuredArticles = new Articles
    @featuredArticles.model = Article
    @featuredArticles.add [_.extend({}, fixtures.article, title: 'Featured Section Article Title')]

    @sectionArticles = new Articles
    @sectionArticles.model = Article
    @sectionArticles.add [_.extend({}, fixtures.article, title: 'Section Article Title')]

    html = render('index')
      sd: {}
      resize: ->
      crop: (url) -> url
      embed: (url) -> url
      article: @article
      footerArticles: new Backbone.Collection
      featuredSection: new Section _.extend {}, fixtures.section, title: 'Moo Bar'
      featuredSectionArticles: @sectionArticles

    @$ = cheerio.load html

  it 'renders the headline', ->
    @$('h1').first().text().should.equal 'Top Ten Booths'

  it 'renders the sections', ->
    @article.get('sections').length.should.equal 5
    @$('section').length.should.equal 5

  it 'renders slideshows', ->
    @$('.article-section-slideshow').length.should.equal 1

  it 'renders image collections', ->
    @$('.article-section-image-collection').length.should.equal 1

  it 'renders artworks', ->
    @$('.article-section-image-collection').should.have.lengthOf 1
    @$('.article-section-image-collection').html().should.containEql '/artwork/govinda-sah-azad-in-between-1'
    @$('.article-section-image-collection').html().should.containEql 'https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg'

  it 'can render artworks with two artists', ->
    @$('.article-section-image-collection').html().should.containEql 'Govinda Sah'
    @$('.article-section-image-collection').html().should.containEql 'Andy Warhol'

  it 'renders video with a cover', ->
    @$('.article-video-container').eq(1).html().should.containEql 'https://artsy.net/video_cover_image.jpg'
    @$('.article-video-container').eq(1).html().should.containEql 'http://youtu.be/yYjLrJRuMnY'
