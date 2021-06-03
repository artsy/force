const getElementPosition = $element => {
  const rect = $element.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  }
}

export interface ScrollIntoViewProps {
  selector: string
  offset?: number
  behavior?: ScrollBehavior
}

export const scrollIntoView = (props: ScrollIntoViewProps) => {
  const { selector, offset = 0, ...rest } = props
  const $element = document.querySelector(selector)

  if ($element) {
    const { top } = getElementPosition($element)
    window.scrollTo({
      top: top - offset,
      ...rest,
    })
  }
}
