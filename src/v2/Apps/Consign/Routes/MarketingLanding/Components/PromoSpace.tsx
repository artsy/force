import React from "react"
import { Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const PromoSpace: React.FC = () => {
  return (
    <SectionContainer bg="black100" py={3}>
      <Text variant="subtitle" color="white100" textAlign="center">
        Now through December 31, 2020 — we are offering 0% commission on any
        work sold with Artsy
      </Text>
    </SectionContainer>
  )
}
