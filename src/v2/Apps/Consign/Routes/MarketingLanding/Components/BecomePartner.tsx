import React from "react"
import { LinkSection } from "./LinkSection"

export const BecomePartner: React.FC<{ darkVariant?: boolean }> = () => {
  return (
    <LinkSection
      title="Are you a gallerist or art dealer?"
      text="Become a partner to sell with Artsy and gain access to the largest global online art marketplace."
      buttonText="Learn More"
      link="https://partners.artsy.net/gallery-partnerships"
      darkVariant
    />
  )
}
