import React from "react"
import { Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const PromoSpace: React.FC = () => {
  const now = new Date(Date.now())
  const expirationDate = new Date(2021, 0, 1)
  if (now > expirationDate) {
    return null
  }

  return (
    <SectionContainer bg="black100" py={3}>
      <Text variant="subtitle" color="white100" textAlign="center">
        Now through December 31, 2020 — we are offering 0% commission on any
        work sold with Artsy
      </Text>
    </SectionContainer>
  )
}
