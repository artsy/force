import * as React from "react"
import { RouterLink } from "System/Components/RouterLink"
import { Text } from "@artsy/palette"
import { useJump } from "Utils/Hooks/useJump"

export const ViewAllButton: React.FC<{ to: string }> = ({ to }) => {
  const { jumpTo } = useJump()

  return (
    <RouterLink
      to={to}
      onClick={() => {
        jumpTo("PartnerHeader")
      }}
    >
      <Text variant="sm">View all</Text>
    </RouterLink>
  )
}
