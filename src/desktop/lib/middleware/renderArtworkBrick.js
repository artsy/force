const {
  renderArtworkBrick,
} = require('../../components/react/reaction_artwork_brick')

module.exports = (req, res, next) => {
  res.locals.renderArtworkBrick = renderArtworkBrick
  next()
}
