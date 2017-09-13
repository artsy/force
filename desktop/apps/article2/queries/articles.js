import articleBody from 'desktop/apps/article2/queries/articleBody'
import sectionFragments from 'desktop/apps/article2/queries/sectionFragments'

export default (offset, limit, channel, vertical) => {
  return `
    {
      articles(published: true, channel_id: "${channel}" limit: ${limit}, offset: ${offset}, featured: true, sort: "-published_at") {
        ${articleBody}
      }
    }
    ${sectionFragments}
  `
}
