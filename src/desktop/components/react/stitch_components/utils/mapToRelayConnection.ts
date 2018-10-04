/**
 * Ensure that old artwork collections conform to new Relay connection api
 */
export const mapToRelayConnection = artworks => {
  return {
    edges: artworks.map(artwork => {
      return {
        node: artwork,
      }
    }),
  }
}
