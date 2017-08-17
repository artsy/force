export default function GeneFamiliesQuery() {
  return `
  {
    gene_families {
      id
      name
      genes {
        id
        name
      }
    }
  }
  `
}
