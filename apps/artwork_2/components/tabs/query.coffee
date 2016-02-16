module.exports = """
  fragment tabs on Artwork {
    tabs {
      __typename
      ... on DescriptionArtworkTab {
        id
        name
        description(format: HTML)
        additional_information(format: HTML)
        signature(format: HTML)
        series
      }
      ... on ExhibitionHistoryArtworkTab {
        id
        name
        exhibition_history(format: HTML)
      }
      ... on ProvenanceArtworkTab {
        id
        name
        provenance(format: HTML)
      }
      ... on BibliographyArtworkTab {
        id
        name
        bibliography(format: HTML)
      }
    }
  }
"""
