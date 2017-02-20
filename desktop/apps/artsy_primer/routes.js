import Article from '../../models/article'
import embed from 'particle'
import { crop } from '../../components/resizer'

export const article = async (req, res, next) => {
  const article = new Article({id: req.params.id})
  await article.fetchWithRelated({
    accessToken: req.user && req.user.get('accessToken')
  })
  res.render('article', { embed, crop, article, lushSignup: true })
}
