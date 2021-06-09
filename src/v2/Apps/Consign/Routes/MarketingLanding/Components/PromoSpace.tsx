import React from "react"
import { Link, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"

export const PromoSpace: React.FC = () => {
  return (
    <SectionContainer bg="black5" py={3}>
      <Text variant="subtitle" color="black100" textAlign="center">
        Gallerist or art dealer?{" "}
        <Link href="https://partners.artsy.net">Become a partner</Link> to
        access the largest global online art marketplace
      </Text>
    </SectionContainer>
  )
}
