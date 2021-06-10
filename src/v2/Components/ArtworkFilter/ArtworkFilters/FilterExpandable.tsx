import {
  Box,
  Expandable,
  ExpandableProps,
  themeProps,
  useThemeConfig,
} from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { getElementParams } from "./helpers"
import { useScrollRefContext } from "./useScrollContext"

export const FilterExpandable: React.FC<ExpandableProps> = props => {
  const tokens = useThemeConfig({
    v2: { mb: 1 },
    v3: { mb: 6 },
  })

  const isScrollIntoViewEnabled = useMatchMedia(themeProps.mediaQueries.xs)

  const ctx = useScrollRefContext()
  const scrollRef = ctx?.scrollRef

  const filterRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(!!props.expanded)

  useEffect(() => {
    if (open && scrollRef?.current) {
      const { height: containerHeight, top: containerTop } = getElementParams(
        scrollRef.current
      )
      const { height: filterHeight, top: filterTop } = getElementParams(
        filterRef.current
      )
      const visiblePartHeight = containerHeight - filterTop + containerTop

      if (visiblePartHeight < filterHeight) {
        anchorRef.current?.scrollIntoView({ block: "end" })
      }
    }
  }, [open])

  const onClick = () => {
    isScrollIntoViewEnabled && setOpen(open => !open)
  }

  return (
    <Box ref={filterRef as any}>
      <Expandable mb={tokens.mb} onClick={onClick} {...props} />
      <div ref={anchorRef}></div>
    </Box>
  )
}
