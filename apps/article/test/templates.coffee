_ = require 'underscore'
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

describe 'article template', ->

  it "renders related footer articles", ->
    html = render('article')
      article: new Article
        title: 'hi'
        sections: []
        section_ids: []
        contributing_authors: []
      footerArticles: new Articles [_.extend(_.clone(fixtures.article),
        thumbnail_title: "This is a footer article"
        section_ids: [])]
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd:
        SCROLL_ARTICLE: 'static'
      asset: ->
    html.should.containEql 'This is a footer article'
