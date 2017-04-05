import Article from '../../models/article'
import ArticleView from '../../components/article/client/view'
import { data as sd } from 'sharify'

export default () => {
  return new ArticleView({
    el: document.body,
    article: new Article(sd.ARTICLE)
  })
}
