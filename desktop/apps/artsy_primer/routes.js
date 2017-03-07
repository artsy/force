import embed from 'particle'
import _ from 'underscore'
import Article from '../../models/article'
import { crop } from '../../components/resizer'

export const article = async (req, res, next) => {
  const article = new Article({id: req.params.id})
  await article.fetchWithRelated({
    accessToken: req.user && req.user.get('accessToken')
  })
  res.locals.sd.ARTICLE = article.toJSON()
  res.render('article', { embed, crop, article, lushSignup: true })
}

export const personalize = async (req, res) => {
  if (req.user != null) {
    const response = await req.user.fetch()
    res.locals.sd.CURRENT_USER = _.extend(response, res.locals.sd.CURRENT_USER)
  }
  res.render('personalize')
}
