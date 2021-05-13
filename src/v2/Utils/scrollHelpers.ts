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

export const scrollIntoView = (passedProps: ScrollIntoViewProps) => {
  const { selector, offset, ...rest } = passedProps
  const $element = document.querySelector(selector)

  if ($element) {
    const { top } = getElementPosition($element)
    window.scrollTo({
      // @ts-expect-error STRICT_NULL_CHECK
      top: top - offset,
      ...rest,
    })
  }
}
