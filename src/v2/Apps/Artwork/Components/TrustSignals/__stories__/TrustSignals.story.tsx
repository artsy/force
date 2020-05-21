import { Flex } from "@artsy/palette"
import { AuthenticityCertificate_artwork } from "v2/__generated__/AuthenticityCertificate_artwork.graphql"
import { SecurePayment_artwork } from "v2/__generated__/SecurePayment_artwork.graphql"
import { VerifiedSeller_artwork } from "v2/__generated__/VerifiedSeller_artwork.graphql"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { AuthenticityCertificate } from "../AuthenticityCertificate"
import { SecurePayment } from "../SecurePayment"
import { VerifiedSeller } from "../VerifiedSeller"

storiesOf("Apps/Artwork/Components", module).add("Trust Signals", () => {
  return (
    <>
      <Section title="Secure Payment">
        <Flex width="100%">
          <SecurePayment
            artwork={
              {
                is_acquireable: true,
                is_offerable: true,
              } as SecurePayment_artwork
            }
          />
        </Flex>
      </Section>
      <Section title="Verified Seller">
        <Flex width="100%">
          <VerifiedSeller
            artwork={
              {
                is_biddable: false,
                partner: {
                  name: "Test gallery",
                  isVerifiedSeller: true,
                },
              } as VerifiedSeller_artwork
            }
          />
        </Flex>
      </Section>
      <Section title="Authenticity certificate">
        <Flex width="100%">
          <AuthenticityCertificate
            artwork={
              {
                hasCertificateOfAuthenticity: true,
              } as AuthenticityCertificate_artwork
            }
          />
        </Flex>
      </Section>
    </>
  )
})
