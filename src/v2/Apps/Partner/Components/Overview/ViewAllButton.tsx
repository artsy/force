import React from "react"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ScrollToPartnerHeader } from "../ScrollToPartnerHeader"
import { Text } from "@artsy/palette"

export const ViewAllButton: React.FC<{ to: string }> = ({ to }) => {
  return (
    <RouterLink tabIndex={-1} to={to}>
      <ScrollToPartnerHeader>
        <Text style={{ textDecoration: "underline" }}>View all</Text>
      </ScrollToPartnerHeader>
    </RouterLink>
  )
}
