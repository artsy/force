_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
Article = require '../../../../models/article'
fixtures = require '../../../../test/helpers/fixtures'

describe 'Article template', ->
  beforeEach ->
    @filename = path.resolve __dirname, "../../templates/articles.jade"

    @article = new Article _.extend(
      _.clone(fixtures.article)
      slug: 'ten-booths-miart-2014'
      thumbnail_image: 'https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg'
    )
    @props = {
      articles: [@article]
      sd: { ARTSY_EDITORIAL_CHANNEL: '123' }
    }

  it 'renders a non-editorial article correctly', ->
    @page = jade.compile(fs.readFileSync(@filename), filename: @filename) @props
    @page.should.containEql 'Top Ten Booths at miart 2014'
    @page.should.containEql '/article/ten-booths-miart-2014'
    @page.should.containEql 'https://artsy-media-uploads.s3.amazonaws.com/9-vuUwfMbo9-dibbqjZQHQ%2FSterling_Ruby_2013_%282%29.jpg'
    @page.should.containEql 'Elena Soboleva'
    @page.should.not.containEql 'has-contributing-author'

  it 'renders an editorial article correctly', ->
    @article.set('author', {id: '456', name: 'Artsy Editorial'})
    @page = jade.compile(fs.readFileSync(@filename), filename: @filename) @props
    @page.should.containEql 'Artsy Editorial'
    @page.should.not.containEql 'has-contributing-author'

  it 'renders a single contributing author', ->
    @article.set('contributing_authors', [{id: '523783258b3b815f7100055a', name: 'Casey Lesser'}])
    @article.set('author', {id: '456', name: 'Artsy Editorial'})
    @page = jade.compile(fs.readFileSync(@filename), filename: @filename) @props
    @page.should.containEql 'Artsy Editorial'
    @page.should.containEql 'Casey Lesser'
    @page.should.containEql 'article-item-contributing-name">By'

  it 'renders two contributing authors', ->
    @article.set('contributing_authors', [
      {id: '523783258b3b815f7100055a', name: 'Casey Lesser'}
      {id: '532783258b3b815f7100055b', name: 'Molly Gottschalk'}
    ])
    @article.set('author', {id: '456', name: 'Artsy Editorial'})
    @page = jade.compile(fs.readFileSync(@filename), filename: @filename) @props
    @page.should.containEql 'Artsy Editorial'
    @page.should.containEql 'article-item-contributing-name">By'
    @page.should.containEql 'Casey Lesser&nbspand&nbsp'
    @page.should.containEql 'Molly Gottschalk'

  it 'renders multiple contributing authors', ->
    @article.set('contributing_authors', [
      {id: '523783258b3b815f7100055a', name: 'Casey Lesser'}
      {id: '532783258b3b815f7100055b', name: 'Molly Gottschalk'}
      {id: '532783258b3b815f7100055c', name: 'Demie Kim'}
    ])
    @article.set('author', {id: '456', name: 'Artsy Editorial'})
    @page = jade.compile(fs.readFileSync(@filename), filename: @filename) @props
    @page.should.containEql 'Artsy Editorial'
    @page.should.containEql 'article-item-contributing-name">By'
    @page.should.containEql 'Casey Lesser,&nbsp'
    @page.should.containEql 'Molly Gottschalk&nbspand&nbsp'
    @page.should.containEql 'Demie Kim'
