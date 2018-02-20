_ = require 'underscore'
artistFixture = require '../../../../components/artist_cell/fixture.coffee'
artistArray = [artistFixture, artistFixture, artistFixture, artistFixture]

module.exports = {
  "data": {
    "featured_artists": [
      {
        "name": "Featured Artists",
        "artists": artistArray
      }
    ],
    "featured_genes": [
      {
        "name": "Featured Genes",
        "genes": [
          {
            "id": "emerging-art",
            "name": "Emerging Art",
            "href": "gene/emerging-art",
            "trending_artists": artistArray
          },
          {
            "id": "contemporary-chinese-art",
            "name": "Contemporary Chinese Art",
            "href": "gene/contemporary-chinese-art",
            "trending_artists": artistArray
          }
        ]
      }
    ]
  }
}
