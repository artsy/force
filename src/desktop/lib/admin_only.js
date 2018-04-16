module.exports = (req, res, next) => {
  if (!req.user || (req.user && req.user.get('type') !== 'Admin')) {
    const err = new Error('You must be logged in as an admin')
    err.status = 403
    next(err)
  } else {
    next()
  }
}
