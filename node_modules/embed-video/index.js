var URL = require("url")

function embed (url, opts) {
  var id

  url = URL.parse(url, true)

  id = detectYoutube(url)
  if (id) return embed.youtube(id, opts)

  id = detectVimeo(url)
  if (id) return embed.vimeo(id, opts)
}

function detectVimeo (url) {
  return (url.hostname == "vimeo.com") ? url.pathname.split("/")[1] : null
}

function detectYoutube (url) {
  if (url.hostname.indexOf("youtube.com") > -1) {
    return url.query.v
  }

  if (url.hostname == "youtu.be") {
    return url.pathname.split("/")[1]
  }

  return null
}

embed.vimeo = function (id, opts) {
  // TODO: use opts to set query string, iframe attrs etc.
  return '<iframe src="//player.vimeo.com/video/' + id + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
}

embed.youtube = function (id, opts) {
  // TODO: use opts to set query string, iframe attrs etc.
  return '<iframe src="//www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>'
}

module.exports = embed