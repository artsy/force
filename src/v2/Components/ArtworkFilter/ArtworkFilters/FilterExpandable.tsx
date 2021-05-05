import { Expandable, ExpandableProps, useThemeConfig } from "@artsy/palette"
import React from "react"

export const FilterExpandable: React.FC<ExpandableProps> = props => {
  const tokens = useThemeConfig({
    v2: { mb: 1 },
    v3: { mb: 6 },
  })

  return <Expandable mb={tokens.mb} {...props} />
}
