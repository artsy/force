_ = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
Section = require '../../models/section'
Sections = require '../../collections/sections'
Channel = require '../../models/channel'
embed = require 'particle'
request = require 'superagent'
{ crop } = require '../../components/resizer'
{ POST_TO_ARTICLE_SLUGS, SAILTHRU_KEY, SAILTHRU_SECRET, GALLERY_INSIGHTS_SECTION_ID, PARSELY_KEY, PARSELY_SECRET } = require '../../config'
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
    res.render 'articles',
      section: section
      articles: articles
      crop: crop

setupEmailSubscriptions = (user, article, cb) ->
  return cb({ editorial: false }) unless user?.email
  if article.get('channel_id') is sd.ARTSY_EDITORIAL_CHANNEL
    subscribedToEditorial user.email, (err, isSubscribed) ->
      cb { editorial: isSubscribed }
  else
    cb { editorial: false }

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
          res.render 'section', section: section, articles: articles

@teamChannel = (req, res, next) ->
  new Channel(id: req.params.slug).fetch
    error: -> next()
    success: (channel) ->
      console.log channel
      return next() unless channel.isTeam()
      new Articles().fetch
        data:
          published: true
          limit: 12
          sort: '-published_at'
          channel: channel.get('id')
        error: res.backboneError
        success: (articles) ->
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.CHANNEL = channel.toJSON()
          res.render 'team_channel', channel: channel, articles: articles

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
