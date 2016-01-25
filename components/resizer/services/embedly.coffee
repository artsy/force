{ EMBEDLY_KEY } = require('sharify').data
resizer = require './index.coffee'

module.exports = embedly =
  endpoint: 'https://i.embed.ly/1/display'

  resize: resizer.resize (url, width, height, quality) ->
    resizer.exec embedly.endpoint, 'resize',
      url: url
      width: width
      height: height
      quality: quality
      key: EMBEDLY_KEY

  crop: resizer.crop (url, width, height, quality) ->
    resizer.exec embedly.endpoint, 'crop',
      url: url
      width: width
      height: height
      quality: quality
      key: EMBEDLY_KEY

  fill: resizer.fill (url, width, height, quality, color) ->
    resizer.exec embedly.endpoint, 'fill',
      url: url
      width: width
      height: height
      color: color
      quality: quality
      key: EMBEDLY_KEY
