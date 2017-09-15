import articleBody from 'desktop/apps/article2/queries/articleBody'
import sectionFragments from 'desktop/apps/article2/queries/sectionFragments'
import relatedArticles from 'desktop/apps/article2/queries/relatedArticles'

export default (offset, limit, channel, omit) => {
  return `
    {
      articles(published: true, channel_id: "${channel}" limit: ${limit}, offset: ${offset}, featured: true, sort: "-published_at", omit: ["${omit}"]) {
        ${articleBody}
        ${relatedArticles}
      }
    }
    ${sectionFragments}
  `
}
