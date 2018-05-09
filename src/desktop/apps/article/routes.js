import * as _ from 'underscore'
import embed from 'particle'
import markdown from 'desktop/components/util/markdown.coffee'
import App from 'desktop/apps/article/components/App'
import ArticleQuery from 'desktop/apps/article/queries/article'
import _Article from 'desktop/models/article.coffee'
import Articles from 'desktop/collections/articles.coffee'
import {
  SuperSubArticlesQuery,
  SuperArticleQuery,
} from 'desktop/apps/article/queries/superArticle'
import { positronql as _positronql } from 'desktop/lib/positronql'
import { crop, resize } from 'desktop/components/resizer/index.coffee'
import { data as _sd } from 'sharify'
import { renderLayout as _renderLayout } from '@artsy/stitch'
import { stringifyJSONForWeb } from 'desktop/components/util/json.coffee'
const { SAILTHRU_KEY, SAILTHRU_SECRET } = require('config')
const sailthru = require('sailthru-client').createSailthruClient(
  SAILTHRU_KEY,
  SAILTHRU_SECRET
)

// FIXME: Rewire
let sd = _sd
let positronql = _positronql
let Article = _Article
let renderLayout = _renderLayout

export async function index(req, res, next) {
  const articleId = req.params.slug

  try {
    const data = await positronql({
      query: ArticleQuery(articleId),
      req,
    })
    const article = data.article
    const articleModel = new Article(data.article)

    if (article.channel_id !== sd.ARTSY_EDITORIAL_CHANNEL) {
      return classic(req, res, next)
    }

    if (articleId !== article.slug) {
      return res.redirect(`/article/${article.slug}`)
    }

    if (
      article.layout === 'video' &&
      article.media &&
      !article.media.published
    ) {
      return next()
    }

    if (
      !_.includes(['standard', 'feature'], article.layout) &&
      req.path.includes('/article')
    ) {
      return res.redirect(`/${article.layout}/${article.slug}`)
    }

    if (
      article.seriesArticle &&
      !req.path.includes(`/series/${article.seriesArticle.slug}/`)
    ) {
      return res.redirect(
        `/series/${article.seriesArticle.slug}/${article.slug}`
      )
    }

    const isSuper = article.is_super_article || article.is_super_sub_article
    const superArticle = new Article()
    const superSubArticles = new Articles()

    // Set main super article
    if (article.is_super_sub_article) {
      const superData = await positronql({
        query: SuperArticleQuery(article.id),
      })
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
    const subscribed = typeof res.locals.sd.CURRENT_USER !== 'undefined'

    let templates
    if (isSuper) {
      templates = {
        SuperArticleFooter:
          '../../../components/article/templates/super_article_footer.jade',
        SuperArticleHeader:
          '../../../components/article/templates/super_article_sticky_header.jade',
      }
    }

    // Series and Video pages
    const isFeatureInSeries =
      article.seriesArticle &&
      article.layout === 'feature' &&
      (article.hero_section && article.hero_section.type === 'fullscreen')
    const hasSeriesNav =
      _.contains(['series', 'video'], article.layout) || isFeatureInSeries

    let layoutTemplate =
      '../../../components/main_layout/templates/react_index.jade'
    if (hasSeriesNav) {
      layoutTemplate =
        '../../../components/main_layout/templates/react_blank_index.jade'
    }

    const isMobile = res.locals.sd.IS_MOBILE
    const jsonLD = stringifyJSONForWeb(articleModel.toJSONLD())

    // Tooltips a/b/c test
    const showTooltips = res.locals.sd.ARTICLE_TOOLTIPS !== 'control'
    const showToolTipMarketData = res.locals.sd.ARTICLE_TOOLTIPS === 'market'

    const layout = await renderLayout({
      basePath: res.app.get('views'),
      layout: layoutTemplate,
      config: {
        styledComponents: true,
      },
      blocks: {
        head: 'meta.jade',
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: 'article',
        bodyClass: getBodyClass(article),
        crop,
        markdown,
      },
      data: {
        article,
        isSuper,
        isMobile,
        jsonLD,
        showTooltips,
        showToolTipMarketData,
        subscribed,
        superArticle,
        superSubArticles,
      },
      templates,
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

const getBodyClass = article => {
  let bodyClass = 'body-article body-no-margins'
  const isSuper = article.is_super_article || article.is_super_sub_article
  const isFullscreen =
    article.hero_section && article.hero_section.type === 'fullscreen'
  if (isSuper && isFullscreen) {
    bodyClass = bodyClass + ' body-no-header'
  }
  return bodyClass
}

export function classic(req, res, next) {
  const article = new Article({ id: req.params.slug })
  const accessToken = req.user ? req.user.get('accessToken') : null

  article.fetchWithRelated({
    accessToken,
    error: res.backboneError,
    success: data => {
      if (req.params.slug !== data.article.get('slug')) {
        return res.redirect(`/article/${data.article.get('slug')}`)
      }

      if (data.partner) {
        return res.redirect(
          `/${data.partner.get(
            'default_profile_id'
          )}/article/${data.article.get('slug')}`
        )
      }

      res.locals.sd.ARTICLE = data.article.toJSON()
      res.locals.sd.INCLUDE_SAILTHRU =
        res.locals.sd.ARTICLE && res.locals.sd.ARTICLE.published
      res.locals.sd.ARTICLE_CHANNEL = data.channel && data.channel.toJSON()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLD())

      res.render(
        'article',
        _.extend(data, {
          embed,
          crop,
          resize,
        })
      )
    },
  })
}

export function amp(req, res, next) {
  const article = new Article({ id: req.params.slug })

  article.fetchWithRelated({
    error: res.backboneError,
    success: data => {
      if (req.params.slug !== data.article.get('slug')) {
        return res.redirect(`/article/${data.article.get('slug')}/amp`)
      }

      if (!data.article.hasAMP()) {
        return next()
      }

      data.article = data.article.prepForAMP()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLDAmp())

      return res.render(
        'amp_article',
        _.extend(data, {
          resize,
          crop,
          embed,
          _,
        })
      )
    },
  })
}

export const subscribedToEditorial = email => {
  return new Promise((resolve, reject) => {
    if (!email.length) {
      return resolve(false)
    }
    sailthru.apiGet(
      'user',
      {
        id: email,
      },
      (err, response) => {
        if (err) {
          return resolve(false)
        } else {
          if (
            response.vars &&
            response.vars.receive_editorial_email &&
            response.vars.email_frequency === 'daily'
          ) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      }
    )
  })
}

export const editorialSignup = (req, res, next) => {
  // Add user to list
  sailthru.apiPost(
    'user',
    {
      id: req.body.email,
      lists: {
        [`${sd.SAILTHRU_MASTER_LIST}`]: 1,
      },
      vars: {
        source: 'editorial',
        receive_editorial_email: true,
        email_frequency: 'daily',
      },
    },
    (err, response) => {
      if (err) {
        return res.status(500).send(response.errormsg)
      }
      if (response.ok) {
        // Send welcome email
        sailthru.apiPost(
          'event',
          {
            event: 'editorial_welcome',
            id: req.body.email,
          },
          (err, response) => {
            if (err) {
              return res.status(500).send(response.errormsg)
            }
            return res.send(req.body)
          }
        )
      } else {
        return res.status(500).send(response.errormsg)
      }
    }
  )
}

export const redirectPost = (req, res, next) =>
  res.redirect(301, req.url.replace('post', 'article'))
