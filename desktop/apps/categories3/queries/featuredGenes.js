export default function FeaturedGenesQuery() {
  return `
  {
    gene_families: ordered_sets(key: "browse:gene-category") {
      name
      genes: items {
        ... on FeaturedLinkItem {
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
