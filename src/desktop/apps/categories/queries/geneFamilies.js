export default function GeneFamiliesQuery() {
  return `
  query GeneFamiliesQuery {
    gene_families: geneFamiliesConnection(first: 20) {
      edges {
        node {
          id
          slug
          name
          genes {
            id
            slug
            name
            display_name: displayName
            is_published: isPublished
          }
          featuredGeneLinks {
            href
            title
            image {
              url(version: "large_rectangle")
            }
          }
        }
      }
    }
  }
  `
}
