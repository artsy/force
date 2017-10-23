// Classic articles include all non-editorial content
// This varies from Team Channels to
import $ from 'jquery'
import { data as sd } from 'sharify'
import Article from 'desktop/models/article.coffee'
import Articles from 'desktop/collections/articles.coffee'
import ArticlesGridView from 'desktop/components/articles_grid/view.coffee'
import ArticleView from 'desktop/components/article/client/view.coffee'
import Channel from 'desktop/models/channel.coffee'
import GalleryInsightsView from 'desktop/components/email/client/gallery_insights.coffee'
import TeamChannelNavView from 'desktop/components/channel_nav/view.coffee'

export const init = () => {
  const article = new Article(sd.ARTICLE)
  const channel = new Channel(sd.ARTICLE_CHANNEL)

  new ArticleView({
    el: $('body'),
    article
  })

  new GalleryInsightsView({ el: $('body').addClass('body-responsive') })

  if (channel.isTeam()) {
    new TeamChannelNavView({
      el: $('body'),
      $content: $('.article-content'),
      offset: 0
    })
  }

  setupFooterArticles(channel)
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
    collection: collection
  })
  collection.fetch({
    data: data
  })
}
