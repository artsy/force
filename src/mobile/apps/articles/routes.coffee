{ Article } = require '../../models/article'
{ Articles } = require '../../collections/articles'
{ Section } = require '../../models/section'

module.exports.article = (req, res, next) ->
  # Handles fair and partner articles
  article = new Article id: req.params.id
  article.fetch
    error: -> next()
    success: =>
      article.fetchRelated
        success: (data) ->
          if data.partner
            return res.redirect "/partner/#{data.partner.get('id')}/article/#{article.get('slug')}"
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
