// Action types
export const UPDATE_ARTWORKS = 'UPDATE_ARTWORKS'
export const TOGGLE_LIST_VIEW = 'TOGGLE_LIST_VIEW'

// Action creators
export function updateArtworks(artworks) {
  return {
    type: UPDATE_ARTWORKS,
    payload: {
      artworks
    }
  }
}

export function toggleListView(isListView) {
  return {
    type: TOGGLE_LIST_VIEW,
    payload: {
      isListView
    }
  }
}
