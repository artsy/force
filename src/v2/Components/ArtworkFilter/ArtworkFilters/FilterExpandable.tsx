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
  const filterRef = useRef(null)
  const anchorRef = useRef(null)

  const [open, setOpen] = useState(!!props.expanded)

  useEffect(() => {
    if (open) {
      const { height: containerHeight, top: containerTop } = getElementParams(
        scrollRef.current
      )
      const { height: filterHeight, top: filterTop } = getElementParams(
        filterRef.current
      )
      const visiblePartHeight = containerHeight - filterTop + containerTop

      if (visiblePartHeight < filterHeight) {
        // @ts-expect-error STRICT_NULL_CHECK
        anchorRef.current.scrollIntoView({ block: "end" })
      }
    }
  }, [open, filterRef])

  const onClick = () => {
    setOpen(open => !open)
  }

  return (
    <Box ref={filterRef}>
      <Expandable mb={tokens.mb} onClick={onClick} {...props} />
      <div ref={anchorRef}></div>
    </Box>
  )
}
