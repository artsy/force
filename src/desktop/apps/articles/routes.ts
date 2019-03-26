import { stitch as _stitch } from "@artsy/stitch"
import { getCurrentUnixTimestamp } from "reaction/Components/Publishing/Constants"
import App from "desktop/apps/articles/components/App"
import {
  newsArticlesQuery,
  newsPanelQuery,
} from "./queries/news_articles_query"
import { positronql as _positronql } from "desktop/lib/positronql"
import { map, sortBy, first, last, reject } from "lodash"
import { subscribedToEditorial } from "desktop/apps/article/routes"
import { data as sd } from "sharify"
const { crop } = require("desktop/components/resizer/index.coffee")
const { PARSELY_KEY, PARSELY_SECRET } = require("../../config.coffee")
const _topParselyArticles = require("desktop/components/util/parsely.coffee")
  .topParselyArticles
const magazineQuery = require("./queries/editorial_articles.coffee")
const Articles = require("desktop/collections/articles.coffee")
const Channel = require("desktop/models/channel.coffee")
const Section = require("desktop/models/section.coffee")

// FIXME: Rewire
let positronql = _positronql
let topParselyArticles = _topParselyArticles
let stitch = _stitch

export const articles = (_req, res, next) => {
  const query = { query: magazineQuery }
  return positronql(query)
    .then(async result => {
      const articles = new Articles(result.articles)
      res.locals.sd.ARTICLES = articles.toJSON()

      // Email
      let onDailyEditorial: any = false
      // Only need to check subscription on mobile
      if (sd.IS_MOBILE && sd.CURRENT_USER) {
        onDailyEditorial = await subscribedToEditorial(sd.CURRENT_USER.email)
      }

      // Fetch News Panel Articles
      positronql({ query: newsPanelQuery() }).then(result => {
        const newsArticles = result.articles
        res.locals.sd.NEWS_ARTICLES = newsArticles
        res.locals.sd.ON_DAILY_EDITORIAL = onDailyEditorial

        res.render("articles", {
          articles: articles,
          crop,
          newsArticles,
        })
      })
    })
    .catch(next)
}

export const redirectMagazine = (_req, res, _next) => {
  res.redirect(301, "/articles")
}

export const section = (_req, res, next) => {
  new Section({ id: "venice-biennale-2015" }).fetch({
    cache: true,
    error: next,
    success: section => {
      new Articles().fetch({
        data: {
          published: true,
          limit: 50,
          sort: "-published_at",
          section_id: section.get("id"),
        },
        error: res.backboneError,
        success: articles => {
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.SECTION = section.toJSON()
          res.render("section", {
            section,
            articles,
          })
        },
      })
    },
  })
}

export const teamChannel = (req, res, next) => {
  const slug = req.path.split("/")[1]
  new Channel({ id: slug }).fetch({
    error: res.backboneError,
    success: channel => {
      if (!channel.isTeam()) {
        return next()
      }
      topParselyArticles(
        channel.get("name"),
        null,
        PARSELY_KEY,
        PARSELY_SECRET,
        parselyArticles => {
          new Articles().fetch({
            data: {
              published: true,
              limit: 6,
              sort: "-published_at",
              ids: map(sortBy(channel.get("pinned_articles"), "index"), "id"),
            },
            error: res.backboneError,
            success: pinnedArticles => {
              if (channel.get("pinned_articles").length === 0) {
                pinnedArticles.reset()
              }
              const pinnedSlugs = pinnedArticles.map(article =>
                article.get("slug")
              )
              const newParselyArticles = reject(parselyArticles, article => {
                const slug = last(article.link.split("/"))
                return pinnedSlugs.includes(slug)
              })

              res.locals.sd.CHANNEL = channel.toJSON()
              res.render("team_channel", {
                channel,
                pinnedArticles,
                parselyArticles: first(newParselyArticles),
              })
            },
          })
        }
      )
    },
  })
}

export async function news(_req, res, next) {
  const isMobile = res.locals.sd.IS_MOBILE
  const renderTime = getCurrentUnixTimestamp()

  // CollectionsRail a/b test
  const isNewsLayout = true

  // TODO: update after CollectionsRail a/b test
  const showCollectionsRail =
    res.locals.sd.EDITORIAL_COLLECTIONS_RAIL === "1" ||
    res.locals.sd.EDITORIAL_COLLECTIONS_RAIL === 1

  try {
    const { articles } = await positronql({
      query: newsArticlesQuery({ limit: 6, offset: 0 }),
    })

    const layout = await stitch({
      basePath: res.app.get("views"),
      layout: "../../../components/main_layout/templates/react_index.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        body: App,
        head: "./meta/news.jade",
      },
      locals: {
        ...res.locals,
        assetPackage: "articles",
        bodyClass: "body-no-margins",
        crop,
      },
      data: {
        articles,
        isMobile,
        renderTime,
        showCollectionsRail,
        isNewsLayout,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
