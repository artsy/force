module.exports = """
  {
    featured_artists: ordered_sets(key: "homepage:featured-artists") {
      name
      artists: items {
        ... on FeaturedLinkItem {
          id
          title
          subtitle
          href
          image {
            thumb: cropped(width: 800, height: 600, version: "wide") {
              width
              height
              url
            }
          }
        }
      }
    }
    featured_genes: ordered_sets(key: "artists:featured-genes") {
      name
      genes: items {
        ... on GeneItem {
          id
          name
          href
          trending_artists(sample: 4) {
            ... artistCell
          }
        }
      }
    }
  }
  #{require '../../components/artist_cell/query.coffee'}
"""
