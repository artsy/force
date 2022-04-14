import { stitch as _stitch } from "@artsy/stitch"
import App from "desktop/apps/articles/components/App"
import { newsArticlesQuery } from "./queries/news_articles_query"
import { positronql as _positronql } from "desktop/lib/positronql"
const { crop } = require("desktop/components/resizer/index.coffee")
const { Articles } = require("desktop/collections/articles")
const { Section } = require("desktop/models/section")

// FIXME: Rewire
let positronql = _positronql
let stitch = _stitch

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

export async function news(_req, res, next) {
  const isMobile = res.locals.sd.IS_MOBILE

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
      },
    })

    res.send(layout)
  } catch (error) {
    next(error)
  }
}
