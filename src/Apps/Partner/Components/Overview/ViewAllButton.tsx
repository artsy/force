import { Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useJump } from "Utils/Hooks/useJump"
import type * as React from "react"

export const ViewAllButton: React.FC<
  React.PropsWithChildren<{ to: string }>
> = ({ to }) => {
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
