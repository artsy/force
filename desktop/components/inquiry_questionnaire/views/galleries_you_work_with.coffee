Affiliated = require './affiliated'

module.exports = class GalleriesYouWorkWith extends Affiliated
  title: 'What galleries do you work with?'
  collectorProfileAttribute: 'affiliated_gallery_ids'
  galaxyPath: '_embedded.galleries'
  galaxyEndpoint: 'galleries'
