import { data as sd } from 'sharify'
import { articleBody } from '../../article/queries/articleBody'

export const news = ```
  articles(
    published: true,
    channel_id: ${sd.ARTSY_EDITORIAL_CHANNEL},
    sort: '-published_at',
    exclude_google_news: false,
    limit: 50
  ) {
    ${articleBody}
  }

```
