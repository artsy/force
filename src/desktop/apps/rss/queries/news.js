import { data as sd } from 'sharify'
import { articleBody } from '../../article/queries/articleBody'
import { sectionFragments } from 'desktop/apps/article/queries/sectionFragments'

export const news = `
  {
    articles(
      published: true,
      channel_id: "${sd.ARTSY_EDITORIAL_CHANNEL}",
      sort: "-published_at",
      exclude_google_news: false,
      limit: 50
    ) {
      ${articleBody}
    }
  }
  ${sectionFragments}
`
