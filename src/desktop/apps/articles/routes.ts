import { stitch as _stitch } from "@artsy/stitch"
import App from "desktop/apps/articles/components/App"
import {
  newsArticlesQuery,
  newsPanelQuery,
} from "./queries/news_articles_query"
import { positronql as _positronql } from "desktop/lib/positronql"
import { first, last, map, reject, sortBy } from "lodash"
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

export const articles = (req, res, next) => {
  const limit = 50
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
  const offset = limit * (page - 1)
  const query = { query: magazineQuery(limit, offset) }
  return positronql(query)
    .then(async result => {
      const articles = new Articles(result.articles)
      res.locals.sd.ARTICLES = articles.toJSON()
      res.locals.sd.PAGE = page

      // Fetch News Panel Articles
      positronql({ query: newsPanelQuery() }).then(result => {
        const newsArticles = result.articles
        res.locals.sd.NEWS_ARTICLES = newsArticles

        res.render("articles", {
          articles: articles,
          crop,
          newsArticles,
          page,
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
          limit: 50,
          published: true,
          section_id: section.get("id"),
          sort: "-published_at",
        },
        error: res.backboneError,
        success: articles => {
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.SECTION = section.toJSON()
          res.render("section", {
            articles,
            section,
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
              ids: map(sortBy(channel.get("pinned_articles"), "index"), "id"),
              limit: 6,
              published: true,
              sort: "-published_at",
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
                parselyArticles: first(newParselyArticles),
                pinnedArticles,
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

  try {
    const { articles } = await positronql({
      query: newsArticlesQuery({ limit: 6, offset: 0 }),
    })

    const layout = await stitch({
      basePath: res.app.get("views"),
      blocks: {
        body: App,
        head: "./meta/news.jade",
      },
      config: {
        styledComponents: true,
      },
      data: {
        articles,
        isMobile,
      },
      layout: "../../../components/main_layout/templates/react_index.jade",
      locals: {
        ...res.locals,
        assetPackage: "articles",
        bodyClass: "body-no-margins",
        crop,
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
