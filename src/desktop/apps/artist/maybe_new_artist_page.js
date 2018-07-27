import { NEW_ARTIST_PAGE_THRESHOLD } from '../../config.coffee'

module.exports = (_req, res, next) => {
  // When not set, we serve the existing artist page.
  if (!NEW_ARTIST_PAGE_THRESHOLD) {
    return next()
  }

  const { NEW_ARTIST_PAGE } = res.locals.sd
  if (parseInt(NEW_ARTIST_PAGE, 10) < NEW_ARTIST_PAGE_THRESHOLD) {
    return next('route')
  } else {
    return next()
  }
}
