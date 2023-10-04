import React, { useRef } from "react"
import { Box, Expandable, ExpandableProps } from "@artsy/palette"
import { getENV } from "Utils/getENV"

export const FilterExpandable: React.FC<ExpandableProps> = ({
  expanded,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  // Note: `IS_MOBILE` requires a full page load
  const isExpanded = !getENV("IS_MOBILE") && Boolean(expanded)

  const handleToggle = (expanded: boolean) => {
    if (!expanded) return

    // Scroll bottom of filter into view, when expanded, if off screen
    requestAnimationFrame(() => {
      const anchor = ref.current
      if (!anchor) return
      const { top } = anchor.getBoundingClientRect()
      if (top < window.innerHeight) return
      anchor.scrollIntoView({ block: "end" })
    })
  }

  return (
    <Box>
      <Expandable
        // TODO: Should not have external margin
        mb={1}
        expanded={isExpanded}
        onToggle={handleToggle}
        {...rest}
      />

      <div ref={ref}></div>
    </Box>
  )
}
