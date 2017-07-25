export const SHOW_INFO_WINDOW = 'SHOW_INFO_WINDOW'

export function showInfoWindow (isVisible) {
  return {
    type: SHOW_INFO_WINDOW,
    payload: {
      showInfoWindow: isVisible
    }
  }
}
