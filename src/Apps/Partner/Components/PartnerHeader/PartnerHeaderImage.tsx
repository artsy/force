import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerHeaderImage_profile$data } from "__generated__/PartnerHeaderImage_profile.graphql"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"

interface PartnerHeaderImageProps {
  profile: PartnerHeaderImage_profile$data
}

export const PartnerHeaderImage: React.FC<PartnerHeaderImageProps> = ({
  profile,
}) => {
  if (!profile || !profile.image?.url) return null
  return <FullBleedHeader src={profile.image.url} />
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
