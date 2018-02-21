//
// Combined config from desktop and mobile for the libraries moved up to ./lib
//
// TODO: We should probably drop these config files altogether and just rely
// on process.env and sharify.
//
module.exports = Object.assign(
  {},
  require('./desktop/config'),
  require('./mobile/config')
)
