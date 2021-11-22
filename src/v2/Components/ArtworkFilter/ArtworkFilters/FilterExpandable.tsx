import React, { useEffect, useRef, useState } from "react"
import {
  Box,
  Expandable,
  ExpandableProps,
  useThemeConfig,
} from "@artsy/palette"
import { useScrollRefContext } from "./useScrollContext"
import { data as sd } from "sharify"
import { getElementParams } from "../Utils/getElementParams"

export const FilterExpandable: React.FC<ExpandableProps> = ({
  expanded,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: { mb: 1 },
    v3: { mb: 6 },
  })

  const ctx = useScrollRefContext()
  const scrollRef = ctx?.scrollRef

  const filterRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const isExpanded = sd.IS_MOBILE ? false : !!expanded
  const [open, setOpen] = useState(isExpanded)

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
  }, [open, scrollRef])

  const onClick = () => {
    if (sd.IS_MOBILE) {
      setOpen(open => !open)
    }
  }

  return (
    <Box ref={filterRef as any}>
      <Expandable
        mb={tokens.mb}
        expanded={isExpanded}
        onClick={onClick}
        {...rest}
      />
      <div ref={anchorRef}></div>
    </Box>
  )
}
