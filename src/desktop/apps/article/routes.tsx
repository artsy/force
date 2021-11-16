import * as _ from "underscore"
import embed from "particle"
import { URL, resolve } from "url"
import { App } from "desktop/apps/article/components/App"
import ArticleQuery from "desktop/apps/article/queries/article"
import {
  SuperArticleQuery,
  SuperSubArticlesQuery,
} from "desktop/apps/article/queries/superArticle"
import { positronql } from "desktop/lib/positronql"
import { data as sd } from "sharify"
import { stitch } from "@artsy/stitch"
import { DateTime } from "luxon"
import {
  getCustomEditorialId,
  getVanguardSubArticleContent,
  isCustomEditorial,
  isVanguardSubArticle,
} from "./editorial_features"
import { slugify } from "underscore.string"
import {
  getBodyClass,
  getJsonLd,
  getLayoutTemplate,
  getSuperArticleTemplates,
  isUnpublishedVideo,
} from "./helpers"
import cheerio from "cheerio"
import {
  auctionQuery,
  partnerQuery,
} from "desktop/apps/article/queries/promotedContent"
import { ArticleMeta } from "@artsy/reaction/dist/Components/Publishing/ArticleMeta"
import { GalleryInsightsRedirects } from "./gallery_insights_redirects"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
const { Articles } = require("desktop/collections/articles")
const markdown = require("desktop/components/util/markdown.coffee")
const { crop, resize } = require("desktop/components/resizer/index.coffee")
const Article = require("desktop/models/article.coffee")
const { stringifyJSONForWeb } = require("desktop/components/util/json.coffee")
const metaphysics = require("lib/metaphysics2.coffee")

export const index = async (req, res, next) => {
  let articleId = req.params.slug

  // Always fetch master series for vanguard 2019 sub-articles
  if (req.path.split("/").includes("artsy-vanguard-2019")) {
    articleId = getCustomEditorialId("VANGUARD_2019")

    if (!req.path.includes(`/series/`)) {
      return res.redirect(
        `/series/artsy-vanguard-2019${
          (req.params.slug && `/${req.params.slug}`) || ""
        }`
      )
    }
  }

  try {
    const { article } = await positronql({
      query: ArticleQuery(articleId),
      req,
    })
    const { search } = new URL(sd.APP_URL + req.url)
    const customEditorial = isCustomEditorial(article.id)

    if (article.channel_id !== sd.ARTSY_EDITORIAL_CHANNEL) {
      // Redirect deprecated Gallery Insights articles
      if (article.channel_id === sd.GALLERY_INSIGHTS_CHANNEL) {
        const resourceSlug = GalleryInsightsRedirects[article.slug]

        if (resourceSlug) {
          return res.redirect(
            resolve("https://partners.artsy.net", resourceSlug)
          )
        } else {
          return res.redirect("https://partners.artsy.net")
        }
      }
      if (req.params.slug !== article.slug) {
        // Redirect to most recent slug
        return res.redirect(`/article/${article.slug}`)
      }

      if (article.partner_channel_id) {
        // redirect partner channels to partner page
        const { partner } = await metaphysics({
          method: "post",
          query: partnerQuery(article.partner_channel_id),
        }).then(data => data)

        return res.redirect(
          `/${partner.default_profile_id}/article/${article.slug}`
        )
      }
      return classic(req, res, next, article)
    }

    if (isVanguardSubArticle(article)) {
      return res.redirect(
        `/series/artsy-vanguard-2019/${slugify(article.title)}`
      )
    }

    let customMetaContent
    if (customEditorial === "VANGUARD_2019") {
      customMetaContent = getVanguardSubArticleContent(req.path, article)
    }

    if (articleId !== article.slug && !customEditorial) {
      return res.redirect(`/article/${article.slug}${search}`)
    }

    if (isUnpublishedVideo(article)) {
      return next()
    }

    if (
      !["classic", "standard", "feature"].includes(article.layout) &&
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

    const { CURRENT_USER, IS_MOBILE, IS_TABLET } = res.locals.sd
    const isMobile = IS_MOBILE
    const isTablet = IS_TABLET
    const { isEigen } = buildServerAppContext(req, res)
    const showTooltips = !isMobile && !isTablet
    const isLoggedIn = typeof CURRENT_USER !== "undefined"

    const layout = await stitch({
      basePath: res.app.get("views"),
      layout: getLayoutTemplate(article),
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => <ArticleMeta article={customMetaContent || article} />,
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
        isEigen,
        jsonLD: getJsonLd(article),
        renderTime: DateTime.local().toMillis(),
        showTooltips,
        superArticle,
        superSubArticles,
      },
      templates: getSuperArticleTemplates(article),
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const classic = async (_req, res, next, article) => {
  const { CURRENT_USER, IS_MOBILE } = res.locals.sd
  const isMobile = IS_MOBILE
  const isLoggedIn = typeof CURRENT_USER !== "undefined"

  if (article.channel_id === sd.PC_ARTSY_CHANNEL && article.partner_ids) {
    const send = {
      method: "post",
      query: partnerQuery(article.partner_ids[0]),
    }

    await metaphysics(send).then(data => {
      article.partner = data.partner
    })
  }

  if (article.channel_id === sd.PC_AUCTION_CHANNEL && article.auction_ids) {
    const send = {
      method: "post",
      query: auctionQuery(article.auction_ids[0]),
    }

    await metaphysics(send).then(data => {
      article.sale = data.sale
    })
  }

  try {
    const layout = await stitch({
      basePath: res.app.get("views"),
      layout: getLayoutTemplate(article),
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => <ArticleMeta article={article} />,
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
        isLoggedIn,
        isMobile,
        jsonLD: getJsonLd(article),
      },
      templates: {
        ArticlesGridView: "../../../components/articles_grid/view.coffee",
      },
    })
    res.send(layout)
  } catch (error) {
    next(error)
  }
}

export const amp = (req, res, next) => {
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

      data.article = prepForAMP(data.article)
      res.locals.jsonLD = stringifyJSONForWeb(data.article.toJSONLDAmp())
      return res.render("amp_article", {
        resize,
        crop,
        embed,
        _,
        ...data,
      })
    },
  })
}

export const redirectPost = (req, res, _next) =>
  res.redirect(301, req.url.replace("post", "article"))

export const redirectAMP = (req, res, _next) =>
  res.redirect(301, req.url.replace("/amp", ""))

/**
 * NOTE: This function exists here instead of in ./helpers.tsx, because the
 *       latter is also imported in client-side source files and doing so for
 *       this function would lead to the `cheerio` dependency be included in the
 *       client bundle, which is not what we want.
 */
function prepForAMP(article) {
  const sections = article.get("sections").map(section => {
    if (section.type === "text") {
      const $ = cheerio.load(section.body)
      $("a:empty").remove()
      $("p").each((_, el) => $(el).removeAttr("isrender"))
      return {
        ...section,
        body: $.html(),
      }
    } else if (["image_set", "image_collection"].includes(section.type)) {
      const images = section.images.map(image => {
        if (image.type === "image" && image.caption) {
          const $ = cheerio.load(image.caption)
          $("p, i").each((_, el) => {
            $(el).removeAttr("isrender")
            $(el).removeAttr("style")
          })
          return {
            ...image,
            caption: $.html(),
          }
        } else {
          return image
        }
      })
      return {
        ...section,
        images,
      }
    }
    return section
  })
  return article.set("sections", sections)
}
