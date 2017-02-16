// Action types
export const UPDATE_ARTWORKS = 'UPDATE_ARTWORKS'
export const TOGGLE_LIST_VIEW = 'TOGGLE_LIST_VIEW'

// Action creators
export function updateArtworks(artworks) {
  return {
    type: UPDATE_ARTWORKS,
    artworks
  }
}

export function toggleListView(listView) {
  return {
    type: TOGGLE_LIST_VIEW,
    listView
  }
}
