export const SHOW_INFO_WINDOW = "SHOW_INFO_WINDOW"
export const SHOW_MODAL = "SHOW_MODAL"

export function showInfoWindow(isVisible) {
  return {
    type: SHOW_INFO_WINDOW,
    payload: {
      showInfoWindow: isVisible,
    },
  }
}

export function showModal(type) {
  return {
    type: SHOW_MODAL,
    payload: {
      modalType: type,
    },
  }
}
