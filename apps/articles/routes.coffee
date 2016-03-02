_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
Section = require '../../models/section'
Sections = require '../../collections/sections'
embedVideo = require 'embed-video'
request = require 'superagent'
{ crop } = require '../../components/resizer'
{ POST_TO_ARTICLE_SLUGS, MAILCHIMP_KEY, SAILTHRU_KEY, SAILTHRU_SECRET } = require '../../config'
sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY,SAILTHRU_SECRET)
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
    if res.locals.sd.CURRENT_USER?.email?
      subscribedToEditorial res.locals.sd.CURRENT_USER.email, (err, subscribed) ->
        res.locals.sd.SUBSCRIBED_TO_EDITORIAL = subscribed
  ]).catch(next).then =>
    res.locals.sd.ARTICLES = articles.toJSON()
    res.locals.sd.ARTICLES_COUNT = articles.count
    section = sections.running()?[0]
    res.render 'articles', section: section, articles: articles, crop: crop

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
      res.locals.sd.RELATED_ARTICLES = data.relatedArticles?.toJSON()
      res.locals.sd.SUPER_SUB_ARTICLE_IDS = data.superSubArticleIds
      res.locals.sd.SCROLL_ARTICLE = getArticleScrollType(data)
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLD())

      # Email subscription checks - Mailchimp (to be replaced by Marketo) and Sailthru
      if res.locals.sd.CURRENT_USER?.email?
        email = res.locals.sd.CURRENT_USER?.email
        if _.contains res.locals.sd.ARTICLE.section_ids, sd.GALLERY_INSIGHTS_SECTION_ID
          subscribed email, (cb) ->
            res.locals.sd.MAILCHIMP_SUBSCRIBED = cb
            res.render 'article', _.extend data, embedVideo: embedVideo
        else
          subscribedToEditorial email, (err, subscribed) ->
            res.locals.sd.SUBSCRIBED_TO_EDITORIAL = subscribed
            res.render 'article', _.extend data, embedVideo: embedVideo
      else
        res.locals.sd.MAILCHIMP_SUBSCRIBED = false
        res.render 'article', _.extend data, embedVideo: embedVideo

getArticleScrollType = (data) ->
  # Only Artsy Editorial and non super/subsuper articles can have an infinite scroll
  if data.relatedArticles?.length or data.article.get('author_id') isnt sd.ARTSY_EDITORIAL_ID
    'static'
  else
    'infinite'

@redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'

@redirectArticle = (req, res, next) ->
  res.redirect 301, req.url.replace 'article', 'articles'

@redirectMagazine = (req, res, next) ->
  res.redirect 301, req.url.replace 'magazine', 'articles'

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

subscribedToEditorial = (email, callback) ->
  sailthru.apiGet 'user', { id: email }, (err, response) ->
    return callback err, false if err
    subscribed = response.vars.receive_editorial_email
    callback null, subscribed

@editorialForm = (req, res, next) ->
  sailthru.apiPost 'user',
    id: req.body.email
    lists:
      "#{sd.SAILTHRU_MASTER_LIST}": 1
    source: 'editorial'
    name: req.body.name
    vars:
      receive_editorial_email: true
      email_frequency: 'daily'
  , (err, response) ->
    if response.ok
      res.send req.body
    else
      res.send response.status, response.body
