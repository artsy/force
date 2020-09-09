{ resize } = require '../../components/resizer/index.coffee'
metaphysics = require '../../../lib/metaphysics2.coffee'

query = """
  query HomePageModulesQuery($showCollectionsHubs:Boolean!) {
    homePage {
      heroUnits(platform: MARTSY) {
        mode
        heading
        title
        subtitle
        href
        backgroundImageURL
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
    .then ({ homePage, marketingHubCollections }) ->
      res.render 'page',
        heroUnits: homePage.heroUnits,
        resize: resize,
        collectionsHubs: marketingHubCollections
    .catch next
