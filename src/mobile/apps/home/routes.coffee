{ resize } = require '../../components/resizer/index.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

query = """
  query {
    home_page {
      hero_units(platform: MARTSY) {
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
  res.locals.sd.PAGE_TYPE = 'home'
  metaphysics(query: query)
    .then ({ home_page  }) ->
      res.render 'page', heroUnits: home_page.hero_units, resize: resize
    .catch next
