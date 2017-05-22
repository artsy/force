_ = require 'underscore'
path = require 'path'
jade = require 'jade'
fs = require 'fs'
moment = require 'moment'
Curation = require '../../../../../models/curation.coffee'
Article = require '../../../../../models/article.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../../../components/venice_2017/templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Venice index', ->

  it "uses social metadata", ->
    curation = new Curation
      sections: [
        {
          social_description: 'Social Description'
          social_title: 'Social Title'
          social_image: 'files.artsy.net/img/social_image.jpg'
          seo_description: 'Seo Description'
        }
      ]
      sub_articles: []
    html = render('index')
      videoIndex: 0
      curation: curation
      isSubscribed: false
      sub_articles: []
      videoGuide: new Article
      crop: (url) -> url
      resize: (url) -> url
      moment: moment
      sd: {}
      markdown: ->
      asset: ->
    html.should.containEql '<meta property="og:image" content="files.artsy.net/img/social_image.jpg">'
    html.should.containEql '<meta property="og:title" content="Social Title">'
    html.should.containEql '<meta property="og:description" content="Social Description">'
    html.should.containEql '<meta name="description" content="Seo Description">'