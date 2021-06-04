import {
  Box,
  Expandable,
  ExpandableProps,
  useThemeConfig,
} from "@artsy/palette"
import React, { useContext, useEffect, useRef, useState } from "react"
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
      // @ts-expect-error STRICT_NULL_CHECK
      const height = ref.current.clientHeight

      scrollRef.current.scrollTo({
        top: height,
      })
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
