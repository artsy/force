module.exports = """
  query ArtistsQuery {
    featured_artists: orderedSets(key: "homepage:featured-artists") {
      name
      artists: items {
        ... on FeaturedLink {
          id: internalID
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
    featured_genes: orderedSets(key: "artists:featured-genes") {
      name
      genes: items {
        ... on Gene {
          id: internalID
          name
          href
          trending_artists: trendingArtists(sample: 4) {
            ... artistCell
          }
        }
      }
    }
  }
  #{require '../../components/artist_cell/query2.coffee'}
"""
