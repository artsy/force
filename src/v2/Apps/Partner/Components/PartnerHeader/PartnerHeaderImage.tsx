import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerHeaderImage_profile } from "v2/__generated__/PartnerHeaderImage_profile.graphql"
import { Box } from "@artsy/palette"
import {
  FullBleedHeader,
  useFullBleedHeaderHeight,
} from "v2/Components/FullBleedHeader"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

interface PartnerHeaderImageProps {
  profile: PartnerHeaderImage_profile
}

export const PartnerHeaderImage: React.FC<PartnerHeaderImageProps> = ({
  profile,
}) => {
  const { mobile, desktop } = useNavBarHeight()
  const height = useFullBleedHeaderHeight()

  if (!profile || !profile.image) return null
  const { image } = profile

  return (
    <>
      <Box height={height} />

      <FullBleedHeader
        top={[mobile, desktop]}
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
