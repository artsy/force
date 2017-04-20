const sd = require('sharify').data
const config = require('../../../../config')
/** Get the live auction url with /login appended when a user is present
 * @param {String} id - auction id/slug
 * @param {Object} [options]
 * @param {Boolean} [options.isLoggedIn] - whether there is a user present
 * @return {String} live auction url
 */
export const liveAuctionUrl = (id, options = {}) => {
  const liveAuctionRoot = sd.PREDICTION_URL || config.PREDICTION_URL
  const url = `${liveAuctionRoot}/${id}`

  if (options.isLoggedIn) {
    return `${url}/login`
  } else {
    return url
  }
}
