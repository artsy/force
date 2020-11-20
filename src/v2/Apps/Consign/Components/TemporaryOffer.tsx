import React from "react"
import { Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const TemporaryOffer: React.FC = () => {
  const now = new Date()
  const expirationDate = new Date(2020, 11, 1)
  if (now > expirationDate) {
    return null
  }

  return (
    <SectionContainer bg="black100" py={3}>
      <Text variant="subtitle" color="white100" textAlign="center">
        Now through November 30, 2020 — we are offering 0% commission on any
        work sold with Artsy.
      </Text>
    </SectionContainer>
  )
}
