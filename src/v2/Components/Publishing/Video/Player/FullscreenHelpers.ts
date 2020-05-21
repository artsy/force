export const requestFullscreen = e => {
  if (e.requestFullscreen) {
    e.requestFullscreen()
  } else if (e.webkitRequestFullscreen) {
    e.webkitRequestFullscreen()
  } else if (e.mozRequestFullScreen) {
    e.mozRequestFullScreen()
  } else if (e.msRequestFullscreen) {
    e.msRequestFullscreen()
  }
}

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

export const fullscreenEnabled = () => {
  return (
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  )
}

export const isFullscreen = () => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )
}

export const addFSEventListener = handler => {
  document.addEventListener("fullscreenchange", handler)
  document.addEventListener("webkitfullscreenchange", handler)
  document.addEventListener("mozfullscreenchange", handler)
  document.addEventListener("MSFullscreenChange", handler)
}

export const removeFSEventListener = handler => {
  document.removeEventListener("fullscreenchange", handler)
  document.removeEventListener("webkitfullscreenchange", handler)
  document.removeEventListener("mozfullscreenchange", handler)
  document.removeEventListener("MSFullscreenChange", handler)
}
