export default function FeaturedGenesQuery () {
  return `
  {
    gene_families: ordered_sets(key: "browse:gene-category", size: 20) {
      name
      genes: items {
        ... on FeaturedLinkItem {
          id
          title
          href
          image {
            url(version: "large_rectangle")
          }
        }
      }
    }
  }
  `
}
