import * as _ from "underscore"
import embed from "particle"
import { URL } from "url"
import { App } from "desktop/apps/article/components/App"
import ArticleQuery from "desktop/apps/article/queries/article"
import {
  SuperSubArticlesQuery,
  SuperArticleQuery,
} from "desktop/apps/article/queries/superArticle"
import { positronql as _positronql } from "desktop/lib/positronql"
import { data as _sd } from "sharify"
import { stitch as _stitch } from "@artsy/stitch"
import { getCurrentUnixTimestamp } from "reaction/Components/Publishing/Constants"
import { createMediaStyle } from "@artsy/reaction/dist/Utils/Responsive"
import { isCustomEditorial } from "./editorial_features"
const Articles = require("desktop/collections/articles.coffee")
const markdown = require("desktop/components/util/markdown.coffee")
const { crop, resize } = require("desktop/components/resizer/index.coffee")
const { stringifyJSONForWeb } = require("desktop/components/util/json.coffee")
const _Article = require("desktop/models/article.coffee")

const { SAILTHRU_KEY, SAILTHRU_SECRET } = require("config")
const sailthru = require("sailthru-client").createSailthruClient(
  SAILTHRU_KEY,
  SAILTHRU_SECRET
)

// FIXME: Rewire
let sd = _sd
let positronql = _positronql
let Article = _Article
let stitch = _stitch

export async function index(req, res, next) {
  const articleId = req.params.slug

  try {
    const data = await positronql({
      query: ArticleQuery(articleId),
      req,
    })
    const article = data.article
    const articleModel = new Article(data.article)
    const search = new URL(sd.APP_URL + req.url).search

    if (article.channel_id !== sd.ARTSY_EDITORIAL_CHANNEL) {
      return classic(req, res, next)
    }

    if (articleId !== article.slug) {
      return res.redirect(`/article/${article.slug}${search}`)
    }

    if (
      article.layout === "video" &&
      article.media &&
      !article.media.published
    ) {
      return next()
    }

    if (
      !_.includes(["standard", "feature"], article.layout) &&
      req.path.includes("/article")
    ) {
      return res.redirect(`/${article.layout}/${article.slug}${search}`)
    }

    if (
      article.seriesArticle &&
      !req.path.includes(`/series/${article.seriesArticle.slug}/`)
    ) {
      return res.redirect(
        `/series/${article.seriesArticle.slug}/${article.slug}${search}`
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
    if (isSuper && superArticle.get("super_article").related_articles) {
      const related = superArticle.get("super_article").related_articles
      const query = SuperSubArticlesQuery(related)
      const superSubData = await positronql({
        query,
      })
      superSubArticles.set(superSubData.articles)
    }

    let templates
    if (isSuper) {
      templates = {
        SuperArticleFooter:
          "../../../components/article/templates/super_article_footer.jade",
        SuperArticleHeader:
          "../../../components/article/templates/super_article_sticky_header.jade",
      }
    }

    // Series and Video pages
    const isFeatureInSeries =
      article.seriesArticle &&
      article.layout === "feature" &&
      (article.hero_section && article.hero_section.type === "fullscreen")
    const hasSeriesNav =
      _.contains(["series", "video"], article.layout) || isFeatureInSeries

    let layoutTemplate =
      "../../../components/main_layout/templates/react_index.jade"
    if (hasSeriesNav) {
      layoutTemplate =
        "../../../components/main_layout/templates/react_blank_index.jade"
    }

    const {
      CURRENT_USER,
      EDITORIAL_COLLECTIONS_RAIL, // TODO: update after CollectionsRail a/b test
      IS_MOBILE,
      IS_TABLET,
    } = res.locals.sd

    const isMobile = IS_MOBILE
    const isTablet = IS_TABLET
    const jsonLD = stringifyJSONForWeb(articleModel.toJSONLD())
    const customEditorial = isCustomEditorial(article.id)

    // Email signup
    const isLoggedIn = typeof CURRENT_USER !== "undefined"
    const showTooltips = !isMobile && !isTablet
    const renderTime = getCurrentUnixTimestamp()

    res.locals.sd.RESPONSIVE_CSS = createMediaStyle()

    // CollectionsRail a/b test
    const hasCollectionsRail =
      EDITORIAL_COLLECTIONS_RAIL === "1" || EDITORIAL_COLLECTIONS_RAIL === 1
    const showCollectionsRail =
      hasCollectionsRail &&
      ["standard", "feature", "news"].includes(article.layout)

    const layout = await stitch({
      basePath: res.app.get("views"),
      layout: layoutTemplate,
      config: {
        styledComponents: true,
      },
      blocks: {
        head: "meta.jade",
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: "article",
        bodyClass: getBodyClass(article),
        crop,
        markdown,
      },
      data: {
        article,
        customEditorial,
        isSuper,
        isLoggedIn,
        isMobile,
        jsonLD,
        renderTime,
        showTooltips,
        superArticle,
        superSubArticles,
        showCollectionsRail,
      },
      templates,
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

const getBodyClass = article => {
  let bodyClass = "body-article body-no-margins"
  const isSuper = article.is_super_article || article.is_super_sub_article
  const isFullscreen =
    article.hero_section && article.hero_section.type === "fullscreen"
  if ((isSuper && isFullscreen) || isCustomEditorial(article.id)) {
    bodyClass = bodyClass + " body-no-header"
  }
  return bodyClass
}

export function classic(req, res, _next) {
  const article = new Article({
    id: req.params.slug,
  })
  const accessToken = req.user ? req.user.get("accessToken") : null

  article.fetchWithRelated({
    accessToken,
    error: res.backboneError,
    success: data => {
      if (req.params.slug !== data.article.get("slug")) {
        return res.redirect(`/article/${data.article.get("slug")}`)
      }

      if (data.partner) {
        return res.redirect(
          `/${data.partner.get(
            "default_profile_id"
          )}/article/${data.article.get("slug")}`
        )
      }

      res.locals.sd.ARTICLE = data.article.toJSON()
      res.locals.sd.INCLUDE_SAILTHRU =
        res.locals.sd.ARTICLE && res.locals.sd.ARTICLE.published
      res.locals.sd.ARTICLE_CHANNEL = data.channel && data.channel.toJSON()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLD())

      res.render(
        "article",
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
  const article = new Article({
    id: req.params.slug,
  })

  article.fetchWithRelated({
    error: res.backboneError,
    success: data => {
      if (req.params.slug !== data.article.get("slug")) {
        return res.redirect(`/article/${data.article.get("slug")}/amp`)
      }

      if (!data.article.hasAMP()) {
        return next()
      }

      data.article = data.article.prepForAMP()
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLDAmp())

      return res.render(
        "amp_article",
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
  return new Promise((resolve, _reject) => {
    if (!email.length) {
      return resolve(false)
    }
    sailthru.apiGet(
      "user",
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
            response.vars.email_frequency === "daily"
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

export const editorialSignup = (req, res, _next) => {
  // Add user to list
  sailthru.apiPost(
    "user",
    {
      id: req.body.email,
      lists: {
        [`${sd.SAILTHRU_MASTER_LIST}`]: 1,
      },
      vars: {
        source: "editorial",
        receive_editorial_email: true,
        email_frequency: "daily",
      },
    },
    (err, response) => {
      if (err) {
        return res.status(500).send(response.errormsg)
      }
      if (response.ok) {
        // Send welcome email
        sailthru.apiPost(
          "event",
          {
            event: "editorial_welcome",
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

export const redirectPost = (req, res, _next) =>
  res.redirect(301, req.url.replace("post", "article"))
