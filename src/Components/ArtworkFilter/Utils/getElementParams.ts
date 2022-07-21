export const getElementParams = element => {
  const height = element.clientHeight
  const top = element.getBoundingClientRect().top
  return { height, top }
}
