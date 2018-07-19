// TODO: Read from ENV.
const NEW_ARTIST_PAGE_THRESHOLD = 3

module.exports = (_req, res, next) => {
  console.log(res.locals.sd.NEW_ARTIST_PAGE)
  if (parseInt(res.locals.sd.NEW_ARTIST_PAGE, 10) < NEW_ARTIST_PAGE_THRESHOLD) {
    return next('route')
  } else {
    return next()
  }
}
