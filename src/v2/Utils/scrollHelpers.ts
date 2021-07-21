import React from "react"

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

export const useScrollIntoView = (isRouteActive: boolean) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>
  React.useEffect(() => {
    if (isRouteActive && ref?.current) {
      ref.current?.scrollIntoView &&
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "start",
        })
    }
  }, [isRouteActive])

  return { ref }
}
