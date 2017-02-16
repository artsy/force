// Action types
export const UPDATE_ARTWORKS = 'UPDATE_ARTWORKS'


// Action creators
export function updateArtworks(artworks) {
  return {
    type: UPDATE_ARTWORKS,
    artworks
  }
}
