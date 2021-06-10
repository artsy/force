import React from "react"
import { Link, Text } from "@artsy/palette"
import { SectionContainer } from "./SectionContainer"
import { Media } from "v2/Utils/Responsive"

export const PromoSpace: React.FC = () => {
  return (
    <SectionContainer bg="black5" py={3}>
      <Media greaterThanOrEqual="sm">
        <Text variant="subtitle" color="black100" textAlign="center">
          Gallerist or art dealer?{" "}
          <Link href="https://partners.artsy.net">Become a partner</Link> to
          access the largest global online art marketplace
        </Text>
      </Media>
      <Media lessThan="sm">
        <Text variant="subtitle" color="black100" textAlign="center">
          Gallerist or art dealer?{" "}
          <Link href="https://partners.artsy.net">Become a partner</Link>
        </Text>
      </Media>
    </SectionContainer>
  )
}
