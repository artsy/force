export const getURLHost = (url) => {
  try {
    const urlObject = new URL(url)
    return urlObject.hostname
  } catch (error) {
    return ''
  }
}
