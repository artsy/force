metaphysics = require '../../../lib/metaphysics.coffee'

query = """
  query {
    home_page {
      hero_units(platform: MOBILE) {
        mode
        heading
        title
        subtitle
        href
        background_image_url
      }
    }
  }
"""

module.exports.index = (req, res, next) ->
  metaphysics(query: query)
    .then ({ home_page  }) ->
      res.render 'page', heroUnits: home_page.hero_units
    .catch next
