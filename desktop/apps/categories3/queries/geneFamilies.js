export default function GeneFamiliesQuery() {
  return `
  {
    gene_families(size: 20) {
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
  `
}
