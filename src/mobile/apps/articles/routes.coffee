_ = require 'underscore'
{ toSentence } = require 'underscore.string'
{ SAILTHRU_KEY, SAILTHRU_SECRET, SAILTHRU_MASTER_LIST } = require '../../config'
sd = require('sharify').data
request = require 'superagent'
Article = require '../../models/article'
Articles = require '../../collections/articles'
Section = require '../../models/section'
Sections = require '../../collections/sections'
embed = require 'embed-video'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY,SAILTHRU_SECRET)

module.exports.article = (req, res, next) ->
  # Handles fair and partner articles
  article = new Article id: req.params.id
  article.fetch
    error: -> next()
    success: =>
      article.fetchRelated
        success: (data) ->
          if data.partner
            return res.redirect "/#{data.partner.get('default_profile_id')}/article/#{article.get('slug')}"
          else if data.fair
            return res.redirect "/#{data.fair.get('default_profile_id')}/article/#{article.get('slug')}"
          else return next()

module.exports.redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'

module.exports.section = (req, res, next) ->
  new Section(id: 'venice-biennale-2015').fetch
    cache: true
    error: -> next()
    success: (section) ->
      new Articles().fetch
        cache: true
        data:
          section_id: section.get('id')
          published: true
          limit: 100
          sort: '-published_at'
        error: res.backboneError
        success: (articles) ->
          res.locals.sd.SECTION = section
          email = res.locals.sd.CURRENT_USER?.email
          res.render 'section', featuredSection: section, articles: articles

module.exports.articles = (req, res, next) ->
  query = """
    {
      articles(published: true, limit: 10, sort: "-published_at", featured: true ) {
        slug
        thumbnail_title
        thumbnail_image
        tier
        published_at
        channel_id
        author{
          name
        }
        contributing_authors{
          name
        }
      }
    }
  """
  newsQuery = """
    {
      articles(published: true, limit: 3, sort: "-published_at", layout: "news" ) {
        title
        slug
      }
    }
  """
  # fetch recent articles
  request.post(sd.POSITRON_URL + '/api/graphql')
    .send(
      query: query
    ).end (err, response) ->
      return next() if err
      articles = response.body.data?.articles
      email = res.locals.sd.CURRENT_USER?.email
      # fetch news articles
      request.post(sd.POSITRON_URL + '/api/graphql')
        .send(
          query: newsQuery
        ).end (err, response) ->
          newsArticles = response.body.data?.articles
          res.locals.sd.ARTICLES = articles
          res.locals.sd.NEWS_ARTICLES = newsArticles
          res.render 'articles',
            articles: articles,
            newsArticles: newsArticles

subscribedToEditorial = (email, cb) ->
  sailthru.apiGet 'user', { id: email }, (err, response) ->
    return cb err, false if err
    cb null, response.vars?.receive_editorial_email

module.exports.editorialForm = (req, res, next) ->
  sailthru.apiPost 'user',
    id: req.body.email
    lists:
      "#{SAILTHRU_MASTER_LIST}": 1
    name: req.body.name
    vars:
      source: 'editorial'
      receive_editorial_email: true
      email_frequency: 'daily'
  , (err, response) ->
    if response.ok
      res.send req.body
    else
      res.status(500).send(response.errormsg)
