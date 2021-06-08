import {
  Box,
  Expandable,
  ExpandableProps,
  useThemeConfig,
} from "@artsy/palette"
import React, { useEffect, useRef, useState } from "react"
import { Media } from "v2/Utils/Responsive"
import { getElementParams } from "./helpers"
import { ScrollRefContextValue, useScrollRefContext } from "./useScrollContext"

const FilterExpandableWithScroll: React.FC<
  ExpandableProps & { tokens: { mb: number } }
> = ({ tokens, ...props }) => {
  const ctx = useScrollRefContext()
  const { scrollRef } = ctx as ScrollRefContextValue

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
  }, [open, filterRef])

  const onClick = () => {
    setOpen(open => !open)
  }

  return (
    <Box ref={filterRef as any}>
      <Expandable mb={tokens.mb} onClick={onClick} {...props} />
      <div ref={anchorRef}></div>
    </Box>
  )
}

export const FilterExpandable: React.FC<ExpandableProps> = props => {
  const tokens = useThemeConfig({
    v2: { mb: 1 },
    v3: { mb: 6 },
  })

  return (
    <>
      <Media at="xs">
        <FilterExpandableWithScroll tokens={tokens} {...props} />
      </Media>
      <Media greaterThan="xs">
        <Expandable mb={tokens.mb} {...props} />
      </Media>
    </>
  )
}
