_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
Section = require '../../models/section'
Sections = require '../../collections/sections'
embedVideo = require 'embed-video'
request = require 'superagent'
{ POST_TO_ARTICLE_SLUGS, MAILCHIMP_KEY } = require '../../config'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'

@articles = (req, res, next) ->
  Q.allSettled([
    (sections = new Sections).fetch(data: featured: true)
    (articles = new Articles).fetch(
      data:
        published: true
        limit: 50
        sort: '-published_at'
        featured: true
    )
  ]).catch(next).then =>
    res.locals.sd.ARTICLES = articles.toJSON()
    res.locals.sd.ARTICLES_COUNT = articles.count
    section = sections.running()?[0]
    res.render 'articles', section: section, articles: articles

@article = (req, res, next) ->
  new Article(id: req.params.slug).fetchWithRelated
    accessToken: req.user?.get('accessToken')
    error: res.backboneError
    success: (data) ->
      if req.params.slug isnt data.article.get('slug')
        return res.redirect "/article/#{data.article.get 'slug'}"
      res.locals.sd.SLIDESHOW_ARTWORKS = data.slideshowArtworks?.toJSON()
      res.locals.sd.ARTICLE = data.article.toJSON()
      res.locals.sd.FOOTER_ARTICLES = data.footerArticles.toJSON()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLD())
      unless data.article.get('author_id') is '503f86e462d56000020002cc'
        res.locals.sd.SCROLL_ARTICLE = 'static'
      videoOptions = { query: { title: 0, portrait: 0, badge: 0, byline: 0, showinfo: 0, rel: 0, controls: 2, modestbranding: 1, iv_load_policy: 3, color: "E5E5E5" } }
      if res.locals.sd.CURRENT_USER?.email? and _.contains res.locals.sd.ARTICLE.section_ids, '55550be07b8a750300db8430'
        email = res.locals.sd.CURRENT_USER?.email
        subscribed email, (cb) ->
          res.locals.sd.MAILCHIMP_SUBSCRIBED = cb
          res.render 'article', _.extend data, embedVideo: embedVideo, videoOptions: videoOptions
      else
        res.locals.sd.MAILCHIMP_SUBSCRIBED = false
        res.render 'article', _.extend data, embedVideo: embedVideo, videoOptions: videoOptions

@redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'

@redirectArticle = (req, res, next) ->
  res.redirect 301, req.url.replace 'article', 'articles'

@section = (req, res, next) ->
  new Section(id: req.params.slug).fetch
    error: -> next()
    success: (section) ->
      return next() unless req.params.slug is section.get('slug')
      new Articles().fetch
        data:
          published: true
          limit: 100
          sort: '-published_at'
          section_id: section.get('id')
        error: res.backboneError
        success: (articles) ->
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.ARTICLES_COUNT = articles.count
          res.locals.sd.SECTION = section.toJSON()
          if res.locals.sd.CURRENT_USER?.email? and res.locals.sd.SECTION.id is '55550be07b8a750300db8430'
            email = res.locals.sd.CURRENT_USER?.email
            subscribed email, (cb) ->
              res.locals.sd.MAILCHIMP_SUBSCRIBED = cb
              res.render 'section', section: section, articles: articles
          else
            res.locals.sd.MAILCHIMP_SUBSCRIBED = false
            res.render 'section', section: section, articles: articles

@form = (req, res, next) ->
  request.post('https://us1.api.mailchimp.com/2.0/lists/subscribe')
    .send(
      apikey: MAILCHIMP_KEY
      id: sd.GALLERY_INSIGHTS_LIST
      email: email: req.body.email
      send_welcome: true
      merge_vars:
        MMERGE1: req.body.fname
        MMERGE2: req.body.lname
        MMERGE3: 'Opt-in (artsy.net)'
      double_optin: false
      send_welcome: true
    ).end (err, response) ->
      if (response.ok)
        res.send req.body
      else
        res.send(response.status, response.body.error)

subscribed = (email, callback) ->
  request.get('https://us1.api.mailchimp.com/2.0/lists/member-info')
    .query(
      apikey: MAILCHIMP_KEY
      id: sd.GALLERY_INSIGHTS_LIST
    ).query("emails[0][email]=#{email}").end (err, response) ->
      callback response.body.success_count is 1
  return
