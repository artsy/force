export const getViewportDimensions = () => {
  let width: number
  let height: number
  try {
    width = window.innerWidth
  } catch (_e) {
    width = 0
  }
  try {
    height = window.innerHeight
  } catch (_e) {
    height = 0
  }
  return { width, height }
}
