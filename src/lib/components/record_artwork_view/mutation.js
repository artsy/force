module.exports = `
  mutation recordArtworkView($artwork_id: String!) {
    recordArtworkView(
      input: { artwork_id: $artwork_id }
    ) {
      artwork_id
    }
  }
`
