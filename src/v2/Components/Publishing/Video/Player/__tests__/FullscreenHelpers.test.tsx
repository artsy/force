import {
  addFSEventListener,
  exitFullscreen,
  fullscreenEnabled,
  isFullscreen,
  removeFSEventListener,
  requestFullscreen,
} from "../FullscreenHelpers"

describe("Fullscreen helper methods", () => {
  let event
  const _document = document as any

  beforeEach(() => {
    event = new Event("fullscreenchange")
    _document.fullscreenEnabled = false
    _document.fullscreenElement = false
    _document.exitFullscreen = null
    _document.webkitExitFullscreen = null
    _document.mozCancelFullScreen = null
    _document.msExitFullscreen = null
  })

  it("#addFSEventListener adds event listeners to handler", () => {
    const onFullscreen = jest.fn()
    addFSEventListener(onFullscreen)
    _document.dispatchEvent(event)
    expect(onFullscreen).toHaveBeenCalledTimes(1)
  })

  it("#removeFSEventListener removes event listeners from handler", () => {
    const onFullscreen = jest.fn()
    removeFSEventListener(onFullscreen)
    _document.dispatchEvent(event)
    expect(onFullscreen).toHaveBeenCalledTimes(0)
  })

  it("#isFullscreen returns true if the document is in fullscreen", () => {
    _document.fullscreenElement = true
    expect(isFullscreen()).toBeTruthy()
  })

  it("#isFullscreen returns false if the document is not in fullscreen", () => {
    _document.fullscreenEnabled = false
    expect(isFullscreen()).toBeFalsy()
  })

  it("#fullscreenEnabled returns true if the document has fullscreen enabled", () => {
    _document.fullscreenEnabled = true
    expect(fullscreenEnabled()).toBeTruthy()
  })

  it("#fullscreenEnabled returns false if the document does not have fullscreen enabled", () => {
    _document.fullscreenEnabled = false
    expect(fullscreenEnabled()).toBeFalsy()
  })

  it("#requestFullscreen opens an element in fullscreen", () => {
    const request = jest.fn()
    requestFullscreen({ requestFullscreen: request })
    expect(request).toHaveBeenCalled()
  })

  it("#requestFullscreen opens an element in fullscreen (webkit)", () => {
    const webkitRequestFullscreen = jest.fn()
    requestFullscreen({ webkitRequestFullscreen })
    expect(webkitRequestFullscreen).toHaveBeenCalled()
  })

  it("#requestFullscreen opens an element in fullscreen (mozilla)", () => {
    const mozRequestFullScreen = jest.fn()
    requestFullscreen({ mozRequestFullScreen })
    expect(mozRequestFullScreen).toHaveBeenCalled()
  })

  it("#requestFullscreen opens an element in fullscreen (ms)", () => {
    const msRequestFullscreen = jest.fn()
    requestFullscreen({ msRequestFullscreen })
    expect(msRequestFullscreen).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen", () => {
    const exit = jest.fn()
    Object.defineProperty(_document, "exitFullscreen", {
      configurable: true,
      enumerable: true,
      value: exit,
      writable: true,
    })
    exitFullscreen()
    expect(exit).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen (webkit)", () => {
    const webkitExitFullscreen = jest.fn()
    Object.defineProperty(_document, "webkitExitFullscreen", {
      configurable: true,
      enumerable: true,
      value: webkitExitFullscreen,
      writable: true,
    })
    exitFullscreen()
    expect(webkitExitFullscreen).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen (mozilla)", () => {
    const mozCancelFullScreen = jest.fn()
    Object.defineProperty(_document, "mozCancelFullScreen", {
      configurable: true,
      enumerable: true,
      value: mozCancelFullScreen,
      writable: true,
    })
    exitFullscreen()
    expect(mozCancelFullScreen).toHaveBeenCalled()
  })

  it("#exitFullscreen escapes an element in fullscreen (ms)", () => {
    const msExitFullscreen = jest.fn()
    Object.defineProperty(_document, "msExitFullscreen", {
      configurable: true,
      enumerable: true,
      value: msExitFullscreen,
      writable: true,
    })
    exitFullscreen()
    expect(msExitFullscreen).toHaveBeenCalled()
  })
})
