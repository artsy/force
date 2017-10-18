export default function GeneFamiliesQuery () {
  return `
  {
    gene_families(first: 20) {
      edges {
        node {
          id
          name
          genes {
            id
            name
            display_name
            is_published
          }
        }
      }
    }
  }
  `
}
