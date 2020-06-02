const getElementPosition = $element => {
  const rect = $element.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  }
}

export const scrollIntoView = passedProps => {
  const { selector, offset } = passedProps
  const $element = document.querySelector(selector)

  if ($element) {
    const { top } = getElementPosition($element)
    window.scrollTo({
      top: top - offset,
    })
  }
}
