_ = require 'underscore'
_s = require 'underscore.string'
cheerio = require 'cheerio'
embed = require 'particle'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
markdown = require '../../../components/util/markdown'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'article show template', ->

  it 'renders sectionless articles', ->
    html = render('index')
      article: new Article title: 'hi', sections: [], section_ids: [], contributing_authors: []
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'hi'

  it 'renders hero section with static image', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: []
        contributing_authors: []
        hero_section:
          type: 'image'
          url: 'http://image.jpg'
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
      _s: _s
    html.should.containEql '<img src="http://image.jpg"'
    html.should.containEql 'class="article-large-format-image"'

  it 'renders hero section with multiple images', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: []
        contributing_authors: []
        hero_section:
          type: 'image_collection'
          images: [
            {
              type: 'image'
              url: 'http://image1.jpg'
            }
            {
              type: 'image'
              url: 'http://image2.jpg'
            }
          ]
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
      _s: _s
    html.should.containEql '<img src="http://image1.jpg"'
    html.should.containEql '<img src="http://image2.jpg"'
    html.should.containEql 'class="article-large-format-image"'

  it 'renders hero section with video', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: []
        contributing_authors: []
        hero_section:
          type: 'video'
          url: 'https://www.youtube.com/watch?v=Bv_5Zv5c-Ts'
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
      embed: embed
    html.should.containEql '<iframe src="//www.youtube.com/embed/Bv_5Zv5c-Ts'
    html.should.containEql 'class="article-large-format-video-container"'

  it 'can optionally exclude share buttons', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: [
          {
            type: 'text'
            body: '<p>Bob Olsen</p>'
          }
        ]
        contributing_authors: []
      footerArticles: new Articles
      hideShare: true
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->

    html.should.not.containEql 'share'

  it 'renders image collections', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: [
          {
            type: 'image_collection',
            layout: 'overflow_fillwidth',
            images: [
              {
                type: 'artwork'
                id: '5321b73dc9dc2458c4000196'
                slug: "govinda-sah-azad-in-between-1",
                date: "2015",
                title: "In Between",
                image: "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
                partner: {
                  name: "October Gallery",
                  slug: "october-gallery"
                },
                artists: [{
                  name: "Govinda Sah 'Azad'",
                  slug: "govinda-sah-azad"
                },
                {
                  name: "Andy Warhol",
                  slug: "andy-warhol"
                }]
              },{
                type: 'image'
                url: "http://artsy.net/image.jpg",
                caption: "<p>Some cool art from 2015</p>",
              }
            ]
          }
        ]
        contributing_authors: []
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
      _s: _s
    html.should.containEql '/artwork/govinda-sah-azad-in-between-1'
    html.should.containEql 'http://artsy.net/image.jpg'
    html.should.containEql '/october-gallery'
    html.should.containEql "Govinda Sah 'Azad'"
    html.should.containEql "Andy Warhol"
    html.should.containEql '<p>Some cool art from 2015</p>'
