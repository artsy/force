{ resize } = require '../../components/resizer/index.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

query = """
  query HomePageModulesQuery($showCollectionsHubs:Boolean!) {
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

    marketingHubCollections @include(if: $showCollectionsHubs){
      id
      slug
      title
      thumbnail
    }
  }
"""

module.exports.index = (req, res, next) ->
  res.locals.sd.PAGE_TYPE = 'home'

  showCollectionsHubs = !res.locals.sd.CURRENT_USER

  metaphysics(query: query, variables: {showCollectionsHubs: showCollectionsHubs})
    .then ({ home_page, marketingHubCollections }) ->
      res.render 'page', 
        heroUnits: home_page.hero_units, 
        resize: resize, 
        collectionsHubs: marketingHubCollections
    .catch next
