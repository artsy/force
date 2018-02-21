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

describe 'Venice video_completed', ->

  it 'passes section url to social mixin', ->
    html = render('video_completed')
      section:
        social_title: 'Social Title'
        slug: 'ep-1'
      sd: { APP_URL: 'http://localhost:5000' }
    html.should.containEql 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A5000%2Fvenice-biennale%2Fep-1'
    html.should.containEql 'Social Title'

describe 'Venice video_description', ->

  it 'passes section url to social mixin', ->
    html = render('video_description')
      section:
        social_title: 'Social Title'
        slug: 'ep-1'
        published: true
      sd: { APP_URL: 'http://localhost:5000' }
      markdown: ->
    html.should.containEql 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A5000%2Fvenice-biennale%2Fep-1'
    html.should.containEql 'Social Title'