module.exports = """
  fragment partner_artworks on Artwork {
    partner {
      type
      name
      href
      counts {
        artworks(format: "0,0", label: "work")
      }
      artworks(
        size: 20
        sort:published_at_desc
        for_sale: true
        exclude: [$id]
      ){
        ... artwork_brick
      }
    }
  }
"""
