import request from 'superagent'
import { data as sd } from 'sharify'
import Articles from '../../collections/articles'
const PAGE_SIZE = 50

export const news = (req, res, next) =>
  new Articles().fetch({
    data: {
      // featured: true - not used on news
      published: true,
      sort: '-published_at',
      exclude_google_news: false,
      limit: PAGE_SIZE,
    },
    error: res.backboneError,
    success: async (articles) => {
      try {
        const newArticles = findArticlesWithEmbeds(articles.models)
        res.set('Content-Type', 'application/rss+xml')
        return res.render('news', { articles: newArticles, pretty: true })
      } catch (err) {
        console.error(err)
      }
    },
  })

export const partnerUpdates = (req, res, next) =>
  new Articles().fetch({
    data: {
      channel_id: sd.GALLERY_PARTNER_UPDATES_CHANNEL,
      published: true,
      sort: '-published_at',
      limit: PAGE_SIZE,
    },
    error: res.backboneError,
    success: (articles) => {
      res.set('Content-Type', 'application/rss+xml')
      return res.render('partner_updates', { articles, pretty: true })
    },
  })

const findArticlesWithEmbeds = (articles) => {
  const newArticles = articles.map((article, i) => {
    const newSections = findSocialEmbeds(article)
    article.set('sections', newSections)
    return article
  })
  return new Articles(newArticles)
}

const findSocialEmbeds = (article) => {
  return article.get('sections').map(async (section, index) => {
    console.log(section.type)
    if (section.type !== 'social_embed') {
      return section
    } else {
      try {
        const newSection = await fetchSocialEmbed(section)
        return newSection
      } catch (err) {
        console.error(err)
      }
    }
  })
}

const fetchSocialEmbed = (section) => {
  const { url } = section
  const service = url.includes('twitter') ? 'publish.twitter' : 'api.instagram'

  request
    .get(`https://${service}.com/oembed?url=${url}`)
    .end(function(err, res) {
      if (err) {
        console.log(err)
      }
      section.url = res.body.html
      return section
    })
}
