_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Article = require '../../../models/article'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures'

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

  it 'renders fullscreen headers with video', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: []
        contributing_authors: []
        hero_section:
          type: 'fullscreen'
          background_url: 'http://video.mp4'
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'article-fullscreen-video-player'

  it 'renders fullscreen headers with static image', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: []
        contributing_authors: []
        hero_section:
          type: 'fullscreen'
          background_image_url: 'http://image.jpg'
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql 'article-fullscreen-image'

  it 'renders a TOC', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: [
          {
            type: 'toc'
            links: [ {name: 'Kana Abe', value: 'Kana'}, { name: 'Bob Olsen', value: 'Bob' } ]
          }
        ]
        contributing_authors: []
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
    html.should.containEql '<a href="#Kana">Kana Abe</a>'

  it 'does not render a TOC header if there are no links', ->
    html = render('index')
      article: new Article
        title: 'hi'
        sections: [
          {
            type: 'toc'
            links: []
          }
        ]
        contributing_authors: []
      footerArticles: new Articles
      crop: (url) -> url
      resize: (u) -> u
      moment: moment
      sd: {}
      asset: ->
    html.should.not.containEql 'Table Of Contents'