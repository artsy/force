import { renderLayout as _renderLayout } from '@artsy/stitch'
import App from 'desktop/apps/articles/components/App.tsx'
import magazineQuery from './queries/editorial_articles.coffee'
import {
  newsArticlesQuery,
  newsPanelQuery,
} from './queries/news_articles_query.js'
import { positronql as _positronql } from 'desktop/lib/positronql'
import Articles from 'desktop/collections/articles.coffee'
import Section from 'desktop/models/section.coffee'
import { crop } from 'desktop/components/resizer/index.coffee'
import Channel from 'desktop/models/channel.coffee'
import { topParselyArticles as _topParselyArticles } from 'desktop/components/util/parsely.coffee'
import { map, sortBy, first, last, reject } from 'lodash'
import { PARSELY_KEY, PARSELY_SECRET } from '../../config.coffee'

// FIXME: Rewire
let positronql = _positronql
let topParselyArticles = _topParselyArticles
let renderLayout = _renderLayout

export const articles = (req, res, next) => {
  const query = { query: magazineQuery }
  return positronql(query)
    .then((result) => {
      const articles = new Articles(result.articles)
      res.locals.sd.SUBSCRIBED_TO_EDITORIAL = !!req.user
      res.locals.sd.ARTICLES = articles.toJSON()
      // Fetch News Panel Articles
      positronql({ query: newsPanelQuery() }).then((result) => {
        const newsArticles = result.articles
        res.locals.sd.NEWS_ARTICLES = newsArticles

        res.render('articles', {
          articles: articles,
          crop,
          newsArticles,
        })
      })
    })
    .catch(next)
}

export const redirectMagazine = (req, res, next) => {
  res.redirect(301, '/articles')
}

export const section = (req, res, next) => {
  new Section({ id: 'venice-biennale-2015' }).fetch({
    cache: true,
    error: next,
    success: (section) => {
      new Articles().fetch({
        data: {
          published: true,
          limit: 50,
          sort: '-published_at',
          section_id: section.get('id'),
        },
        error: res.backboneError,
        success: (articles) => {
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.SECTION = section.toJSON()
          res.render('section', {
            section,
            articles,
          })
        },
      })
    },
  })
}

export const teamChannel = (req, res, next) => {
  const slug = req.path.split('/')[1]
  new Channel({ id: slug }).fetch({
    error: res.backboneError,
    success: (channel) => {
      if (!channel.isTeam()) {
        return next()
      }
      topParselyArticles(
        channel.get('name'),
        null,
        PARSELY_KEY,
        PARSELY_SECRET,
        (parselyArticles) => {
          new Articles().fetch({
            data: {
              published: true,
              limit: 6,
              sort: '-published_at',
              ids: map(sortBy(channel.get('pinned_articles'), 'index'), 'id'),
            },
            error: res.backboneError,
            success: (pinnedArticles) => {
              if (channel.get('pinned_articles').length === 0) {
                pinnedArticles.reset()
              }
              const pinnedSlugs = pinnedArticles.map((article) =>
                article.get('slug')
              )
              const newParselyArticles = reject(parselyArticles, (article) => {
                const slug = last(article.link.split('/'))
                return pinnedSlugs.includes(slug)
              })
              const numRemaining = 6 - pinnedArticles.length

              res.locals.sd.CHANNEL = channel.toJSON()
              res.render('team_channel', {
                channel,
                pinnedArticles,
                parselyArticles: first(newParselyArticles, numRemaining),
              })
            },
          })
        }
      )
    },
  })
}

export async function news(req, res, next) {
  const isMobile = res.locals.sd.IS_MOBILE

  try {
    const { articles } = await positronql({
      query: newsArticlesQuery({ limit: 6 }),
    })

    const layout = await renderLayout({
      basePath: res.app.get('views'),
      layout: '../../../components/main_layout/templates/react_index.jade',
      config: {
        styledComponents: true,
      },
      blocks: {
        body: App,
        head: './meta/news.jade',
      },
      locals: {
        ...res.locals,
        assetPackage: 'articles',
        bodyClass: 'body-no-margins',
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
