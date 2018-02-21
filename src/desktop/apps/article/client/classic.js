// Initializes all client-side Backbone views for "classic" layouts

import _$ from 'jquery'
import { data as _sd } from 'sharify'
import { auctionQuery, partnerQuery } from 'desktop/apps/article/queries/promotedContent'
import metaphysics from 'lib/metaphysics.coffee'
import Article from 'desktop/models/article.coffee'
import Articles from 'desktop/collections/articles.coffee'
import _ArticlesGridView from 'desktop/components/articles_grid/view.coffee'
import _ArticleView from 'desktop/components/article/client/view.coffee'
import Channel from 'desktop/models/channel.coffee'
import _GalleryInsightsView from 'desktop/components/email/client/gallery_insights.coffee'
import _TeamChannelNavView from 'desktop/components/channel_nav/view.coffee'

// FIXME: Rewire
let $ = _$
let sd = _sd
let ArticlesGridView = _ArticlesGridView
let TeamChannelNavView = _TeamChannelNavView
let ArticleView = _ArticleView
let GalleryInsightsView = _GalleryInsightsView

const promotedTemplate = (args) => {
  return require('desktop/apps/article/templates/promoted_content.jade')(args)
}

export const init = () => {
  const article = new Article(sd.ARTICLE)
  const channel = new Channel(sd.ARTICLE_CHANNEL)

  new ArticleView({
    el: $('body'),
    article
  })

  new GalleryInsightsView({ el: $('body') })

  if (channel.isTeam()) {
    new TeamChannelNavView({
      el: $('body'),
      $content: $('.article-content'),
      offset: 0
    })
  }

  setupFooterArticles(channel)
  setupPromotedContent(article)
}

const setupFooterArticles = (channel) => {
  const data = {
    published: true,
    sort: '-published_at',
    limit: 12,
    channel_id: channel.get('id')
  }
  const collection = new Articles()

  new ArticlesGridView({
    el: $('#articles-footer').addClass('articles-grid'),
    hideMore: true,
    header: `More from ${channel.get('name') || 'Artsy'}`,
    collection
  })

  collection.fetch({
    data: data
  })
}

const setupPromotedContent = (article) => {
  const channel = article.get('channel_id')
  if (channel === sd.PC_ARTSY_CHANNEL && article.get('partner_ids')) {
    const send = {
      method: 'post',
      query: partnerQuery(article.get('partner_ids')[0])
    }
    metaphysics(send)
    .then((data) => {
      const cropped = data.partner.profile.image.cropped
      const src = cropped ? cropped.url : ''
      $('#articles-show').prepend(promotedTemplate({
        src,
        name: data.partner.name,
        href: data.partner.profile.href,
        type: data.partner.type === 'Gallery' ? 'Gallery' : 'Institution'
      }))
    })
  } else if (channel === sd.PC_AUCTION_CHANNEL && article.get('auction_ids')) {
    const send = {
      method: 'post',
      query: auctionQuery(article.get('auction_ids')[0])
    }
    metaphysics(send)
    .then((data) => {
      const cropped = data.sale.cover_image.cropped
      const src = cropped ? cropped.url : ''
      $('#articles-show').prepend(promotedTemplate({
        src,
        name: data.sale.name,
        href: data.sale.href,
        type: 'Auction'
      }))
    })
  }
}
