initCarousel = require '../../../components/merry_go_round/index.coffee'

module.exports.init = ->
  promise = initCarousel $('.js-partner-stats-slideshow'), { autoPlay: 2500, wrapAround: true }