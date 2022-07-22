export const getViewportDimensions = () => {
  let width: number
  let height: number
  try {
    width = window.innerWidth
  } catch (e) {
    width = 0
  }
  try {
    height = window.innerHeight
  } catch (e) {
    height = 0
  }
  return { width, height }
}
