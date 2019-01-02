const { NEW_ARTWORK_PAGE_THRESHOLD } = require("desktop/config.coffee")

module.exports = (_req, res, next) => {
  // When not set, we serve the existing artist page.
  if (!NEW_ARTWORK_PAGE_THRESHOLD) {
    return next()
  }

  const { NEW_ARTWORK_PAGE } = res.locals.sd
  if (parseInt(NEW_ARTWORK_PAGE, 10) < NEW_ARTWORK_PAGE_THRESHOLD) {
    // Pass to the next matching route (new artwork)
    return next("route")
  } else {
    return next()
  }
}
