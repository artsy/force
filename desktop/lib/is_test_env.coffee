{ NODE_ENV } = require('sharify').data
module.exports = NODE_ENV not in ['production', 'staging', 'development']
