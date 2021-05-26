import React from "react"
import { LinkSection } from "./LinkSection"

export const ContactUs: React.FC<{ darkVariant?: boolean }> = () => {
  return (
    <LinkSection
      title="Questions? Speak to an Artsy Specialist"
      buttonText="Send an email"
      link="mailto:consign@artsy.net"
      text={() => {
        return (
          <>
            Email us at <b>consign@artsy.net</b> or call <b>+1-646-797-3423</b>{" "}
            for more information on how Artsy can sell your artwork.
          </>
        )
      }}
    />
  )
}
