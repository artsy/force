import embed from 'particle'
import _ from 'underscore'
import moment from 'moment'
import Article from '../../models/article'
import { crop } from '../../components/resizer'
import {
  SAILTHRU_KEY,
  SAILTHRU_SECRET,
  SAILTHRU_MASTER_LIST
} from '../../config'

const sailThruClient = require('sailthru-client')
  .createSailthruClient(SAILTHRU_KEY, SAILTHRU_SECRET)

export const article = async (req, res, next) => {
  if (!req.user) return res.redirect('/log_in?redirect_uri=' + req.url)
  const article = new Article({ id: req.params.id })
  await article.fetchWithRelated({
    accessToken: req.user && req.user.get('accessToken')
  })
  if (req.url.match('primer-digest')) res.locals.h2 = 'Collecting Digest'
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

export const setSailthruData = async (req, res) => {
  sailThruClient.apiPost('user', {
    id: req.user.get('email'),
    lists: {
      [SAILTHRU_MASTER_LIST]: 1
    },
    vars: {
      artsy_primer: true,
      artsy_primer_sign_up_time: moment().format('X')
    }
  }, (err, response) => {
    if (!err && response.ok) {
      res.status(200).send({ set: true })
    } else {
      res.status(500).send(response.errormsg)
    }
  })
}
