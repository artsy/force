import * as _ from 'underscore'
import App from 'desktop/apps/article2/components/App'
import ArticleQuery from 'desktop/apps/article2/queries/article'
import Article from 'desktop/models/article.coffee'
import Articles from 'desktop/collections/articles.coffee'
import { SuperSubArticlesQuery, SuperArticleQuery } from 'desktop/apps/article2/queries/superArticle'
import positronql from 'desktop/lib/positronql.coffee'
import embed from 'particle'
import { crop, resize } from 'desktop/components/resizer/index.coffee'
import markdown from 'desktop/components/util/markdown.coffee'
import { data as sd } from 'sharify'
import { renderLayout } from '@artsy/stitch'
import { stringifyJSONForWeb } from 'desktop/components/util/json.coffee'
const { SAILTHRU_KEY, SAILTHRU_SECRET } = require('config')
const sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY, SAILTHRU_SECRET)

export async function article2Index (req, res, next) {
  const articleId = req.params.slug

  try {
    const data = await positronql({
      query: ArticleQuery(articleId),
      req
    })
    const article = data.article

    if (article.channel_id !== sd.ARTSY_EDITORIAL_CHANNEL) {
      return classic(req, res, next)
    }

    if (articleId !== article.slug) {
      return res.redirect(`/article/${article.slug}`)
    }

    const isSuper = article.is_super_article || article.is_super_sub_article
    const superArticle = new Article()
    const superSubArticles = new Articles()

    // Set main super article
    if (article.is_super_sub_article) {
      const superData = await positronql({ query: SuperArticleQuery(article.id) })
      superArticle.set(superData.articles[0])
    } else if (article.is_super_article) {
      superArticle.set(article)
    }

    // Set super sub articles
    if (isSuper && superArticle.get('super_article').related_articles) {
      const related = superArticle.get('super_article').related_articles
      const query = SuperSubArticlesQuery(related)
      const superSubData = await positronql({ query })
      superSubArticles.set(superSubData.articles)
    }

    // Email signup
    let subscribed = false
    if (article.layout === 'standard') {
      const user = res.locals.sd.CURRENT_USER
      const email = (user && user.email) || ''
      subscribed = await subscribedToEditorial(email)
    }

    let templates
    if (isSuper) {
      templates = {
        SuperArticleFooter: '../../../components/article/templates/super_article_footer.jade',
        SuperArticleHeader: '../../../components/article/templates/super_article_sticky_header.jade'
      }
    }

    const isMobile = res.locals.sd.IS_MOBILE

    const layout = await renderLayout({
      basePath: res.app.get('views'),
      layout: '../../../components/main_layout/templates/react_index.jade',
      config: {
        styledComponents: true
      },
      blocks: {
        head: 'meta.jade',
        body: App
      },
      locals: {
        ...res.locals,
        assetPackage: 'article2',
        bodyClass: getBodyClass(article),
        crop,
        markdown
      },
      data: {
        article,
        subscribed,
        superArticle,
        superSubArticles,
        isSuper,
        isMobile
      },
      templates
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

const getBodyClass = (article) => {
  let bodyClass = 'body-article body-no-margins'
  const isSuper = article.is_super_article || article.is_super_sub_article
  const isFullscreen = article.hero_section && article.hero_section.type === 'fullscreen'
  if (isSuper && isFullscreen) { bodyClass = bodyClass + ' body-no-header' }
  return bodyClass
}

async function classic (req, res, next) {
  const article = new Article({id: req.params.slug})
  const accessToken = req.user ? req.user.get('accessToken') : null

  article.fetchWithRelated({
    accessToken,
    error: res.backboneError,
    success: (data) => {
      if (req.params.slug !== data.article.get('slug')) {
        return res.redirect(`/article2/${data.article.get('slug')}`)
      }

      if (data.partner) {
        return res.redirect(`/${data.partner.get('default_profile_id')}/article/${data.article.get('slug')}`)
      }

      res.locals.sd.ARTICLE = data.article.toJSON()
      res.locals.sd.INCLUDE_SAILTHRU = res.locals.sd.ARTICLE && res.locals.sd.ARTICLE.published
      res.locals.sd.ARTICLE_CHANNEL = data.channel.toJSON()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLD())

      res.render('article', _.extend(data, {
        embed,
        crop,
        resize
      }))
    }
  })
}

export function amp (req, res, next) {
  const article = new Article({id: req.params.slug})

  article.fetchWithRelated({
    error: res.backboneError,
    success: (data) => {
      if (req.params.slug !== data.article.get('slug')) {
        return res.redirect(`/article2/${data.article.get('slug')}/amp`)
      }

      if (!data.article.hasAMP()) {
        return next()
      }

      data.article = data.article.prepForAMP()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLDAmp())

      return res.render('amp_article', _.extend(data, {
        resize,
        crop,
        embed
      }))
    }
  })
}

export const subscribedToEditorial = (email) => {
  return new Promise((resolve, reject) => {
    if (!email.length) {
      return resolve(false)
    }
    sailthru.apiGet('user', {
      id: email
    }, (err, response) => {
      if (err) {
        return resolve(false)
      } else {
        if (response.vars && response.vars.receive_editorial_email) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}

export const editorialSignup = (req, res, next) => {
  // Add user to list
  sailthru.apiPost('user', {
    id: req.body.email,
    lists: {
      [`${sd.SAILTHRU_MASTER_LIST}`]: 1
    },
    vars: {
      source: 'editorial',
      receive_editorial_email: true,
      email_frequency: 'daily'
    }
  }, (err, response) => {
    if (err) {
      return res.status(500).send(response.errormsg)
    }
    if (response.ok) {
      // Send welcome email
      sailthru.apiPost('event', {
        event: 'editorial_welcome',
        id: req.body.email
      }, (err, response) => {
        if (err) {
          return res.status(500).send(response.errormsg)
        }
        return res.send(req.body)
      })
    } else {
      return res.status(500).send(response.errormsg)
    }
  })
}
