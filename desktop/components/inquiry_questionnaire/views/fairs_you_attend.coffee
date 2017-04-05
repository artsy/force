Affiliated = require './affiliated'

module.exports = class FairsYouAttend extends Affiliated
  title: 'What fairs do you attend?'
  collectorProfileAttribute: 'affiliated_fair_ids'
  galaxyPath: '_embedded.fairs'
  galaxyEndpoint: 'fairs'
