import qs from 'qs'
import request from 'superagent'
import { extend } from 'underscore'

const { POSITRON_URL } = require('sharify').data
const POSITRON_GRAPHQL_URL = POSITRON_URL + '/api/graphql'

export const positronql = (options) => {
  const {
    method = 'get',
    query,
    variables,
    req
  } = options

  return new Promise((resolve, reject) => {
    const r = request[method](POSITRON_GRAPHQL_URL)
      .set('Accept', 'application/json')

    if (req && req.user) {
      r.set('X-Access-Token', req.user.get('accessToken'))
    }

    r.query({
      query,
      variables: JSON.stringify(variables)
    })

    r.end((err, response) => {
      if (err) {
        return reject(err)
      }

      if (response.body.errors) {
        const error = new Error(JSON.stringify(response.body.errors))

        response.body.errors.map(({ message }) => {
          if (message.match(/Not Found/i)) {
            error.status = 404
            return reject(error)
          } else if (message.match(/Must be a member/i)) {
            error.status = 403
            return reject(error)
          }
        })
      }

      resolve(response.body.data)
    })
  })
}
