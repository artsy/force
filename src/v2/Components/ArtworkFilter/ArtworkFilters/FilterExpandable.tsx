import {
  Box,
  Expandable,
  ExpandableProps,
  useThemeConfig,
} from "@artsy/palette"
import React, { useContext, useEffect, useRef, useState } from "react"
import { getElementParams } from "./helpers"
import { ScrollRefContext } from "./useScrollContext"

export const FilterExpandable: React.FC<ExpandableProps> = props => {
  const tokens = useThemeConfig({
    v2: { mb: 1 },
    v3: { mb: 6 },
  })

  // @ts-expect-error STRICT_NULL_CHECK
  const { scrollRef } = useContext(ScrollRefContext)
  const ref = useRef(null)

  const [open, setOpen] = useState(!!props.expanded)

  useEffect(() => {
    if (open) {
      const { height: containerHeight, top: containerTop } = getElementParams(
        scrollRef.current
      )
      const { height: elementHeight, top: elementTop } = getElementParams(
        ref.current
      )
      const visiblePartHeight = containerHeight - elementTop + containerTop

      if (visiblePartHeight < elementHeight) {
        const currentPosition = scrollRef.current.scrollTop
        scrollRef.current.scrollTo({
          top: currentPosition - visiblePartHeight + elementHeight,
        })
      }
    }
  }, [open, ref])

  const onClick = () => {
    setOpen(open => !open)
  }

  return (
    <Box ref={ref}>
      <Expandable mb={tokens.mb} onClick={onClick} {...props} />
    </Box>
  )
}
