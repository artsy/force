BackgroundCheck = require('background-check/background-check.js')

module.exports = ({ targets, backgroundClass, imageUrl }) ->

  convertImageToDataURI = ->
    canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    ctx = canvas.getContext '2d'
    ctx.drawImage img, 0, 0

    canvas.toDataURL 'image/png'

  img = new Image()
  img.setAttribute 'crossorigin', ''
  background = document.querySelector backgroundClass

  # very bootleg, but better than
  # forwarding headers (which would degrade caching)
  dataSrc = imageUrl.replace('https://d32dm0rphc51dk.cloudfront.net/','http://s3.amazonaws.com/artsy-media-assets/')
  img.src = dataSrc

  img.onload = =>
    data = convertImageToDataURI img
    background.style.backgroundImage = "url(#{data})"

    BackgroundCheck.init
      targets: targets
      images: background
      classes:
        light: 'is-light'
        dark: 'is-dark'
        complex: 'is-complex'
