import Article from '../../models/article.coffee'
import ArticleView from '../../components/article/client/view.coffee'
import { data as sd } from 'sharify'

export default () => {
  return new ArticleView({
    el: document.body,
    article: new Article(sd.ARTICLE),
    waypointUrls: true,
    lushSignup: true
  })
}
