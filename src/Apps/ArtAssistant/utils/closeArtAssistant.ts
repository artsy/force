export const closeArtAssistant = (event: {
  preventDefault: () => void
}): void => {
  // Farce's index counts in-app navigation; history.length also counts about:blank.
  const index = window.history.state?.index
  if (typeof index !== "number" || index <= 0) return
  event.preventDefault()
  window.history.back()
}
