_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Article = require '../../models/article'
embed = require 'particle'
request = require 'superagent'
{ crop } = require '../../components/resizer'
{ SAILTHRU_KEY, SAILTHRU_SECRET, PARSELY_KEY, PARSELY_SECRET } = require '../../config'
sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY,SAILTHRU_SECRET)
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'

@article = (req, res, next) ->
  articleItem = new Article id: req.params.slug
  articleItem.fetchWithRelated
    accessToken: req.user?.get('accessToken')
    error: res.backboneError
    success: (data) ->
      if req.params.slug isnt data.article.get('slug')
        return res.redirect "/article/#{data.article.get 'slug'}"
      if data.partner
        return res.redirect "/#{data.partner.get('default_profile_id')}/article/#{data.article.get('slug')}"
      res.locals.sd.SLIDESHOW_ARTWORKS = data.slideshowArtworks?.toJSON()
      res.locals.sd.ARTICLE = data.article.toJSON()
      res.locals.sd.INCLUDE_SAILTHRU = res.locals.sd.ARTICLE && res.locals.sd.ARTICLE.published
      res.locals.sd.FOOTER_ARTICLES = data.footerArticles.toJSON()
      res.locals.sd.RELATED_ARTICLES = data.relatedArticles?.toJSON()
      res.locals.sd.SUPER_SUB_ARTICLE_IDS = data.superSubArticleIds
      res.locals.sd.SCROLL_ARTICLE = getArticleScrollType(data)
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLD())

      # Email Subscriptions
      user = res.locals.sd.CURRENT_USER
      setupEmailSubscriptions user, data.article, (results) ->
        res.locals.sd.SUBSCRIBED_TO_EDITORIAL = results.editorial

        # Parsely Articles
        articleItem.topParselyArticles data.article, PARSELY_KEY, PARSELY_SECRET, (parselyArticles) ->
          res.locals.sd.PARSELY_ARTICLES = parselyArticles
          res.render 'article', _.extend data,
            embed: embed
            crop: crop
            lushSignup: true
      return

setupEmailSubscriptions = (user, article, cb) ->
  return cb({ editorial: false }) unless user?.email
  if article.get('channel_id') is sd.ARTSY_EDITORIAL_CHANNEL
    subscribedToEditorial user.email, (err, isSubscribed) ->
      cb { editorial: isSubscribed }
  else
    cb { editorial: false }

getArticleScrollType = (data) ->
  # Only Artsy Editorial and non super/subsuper articles can have an infinite scroll
  if data.relatedArticles?.length or data.article.get('channel_id') isnt sd.ARTSY_EDITORIAL_CHANNEL
    'static'
  else
    'infinite'

@redirectPost = (req, res, next) ->
  res.redirect 301, req.url.replace 'post', 'article'

@redirectArticle = (req, res, next) ->
  res.redirect 301, req.url.replace 'article', 'articles'

subscribedToEditorial = (email, cb) ->
  sailthru.apiGet 'user', { id: email }, (err, response) ->
    return cb err, false if err
    cb null, response.vars?.receive_editorial_email

@editorialForm = (req, res, next) ->
  sailthru.apiPost 'user',
    id: req.body.email
    lists:
      "#{sd.SAILTHRU_MASTER_LIST}": 1
    name: req.body.name
    vars:
      source: 'editorial'
      receive_editorial_email: true
      email_frequency: 'daily'
  , (err, response) ->
    if response.ok
      sailthru.apiPost 'event',
        event: 'editorial_welcome'
        id: req.body.email
      , (err, response) ->
        res.send req.body
    else
      res.status(500).send(response.errormsg)
