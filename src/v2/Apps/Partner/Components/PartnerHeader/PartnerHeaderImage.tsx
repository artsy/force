import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerHeaderImage_profile } from "v2/__generated__/PartnerHeaderImage_profile.graphql"
import { Box } from "@artsy/palette"
import { MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT } from "v2/Components/NavBar"
import {
  FullBleedHeader,
  FULL_BLEED_HEADER_HEIGHT,
} from "v2/Components/FullBleedHeader"

interface PartnerHeaderImageProps {
  profile: PartnerHeaderImage_profile
}

export const PartnerHeaderImage: React.FC<PartnerHeaderImageProps> = ({
  profile,
}) => {
  if (!profile || !profile.image) return null
  const { image } = profile

  return (
    <>
      <Box height={FULL_BLEED_HEADER_HEIGHT} />

      <FullBleedHeader
        top={[MOBILE_NAV_HEIGHT, NAV_BAR_HEIGHT]}
        position="fixed"
        zIndex={-1}
        // @ts-expect-error STRICT_NULL_CHECK
        src={image.url}
      />
    </>
  )
}

export const PartnerHeaderImageFragmentContainer = createFragmentContainer(
  PartnerHeaderImage,
  {
    profile: graphql`
      fragment PartnerHeaderImage_profile on Profile {
        image {
          url(version: "wide")
        }
      }
    `,
  }
)
