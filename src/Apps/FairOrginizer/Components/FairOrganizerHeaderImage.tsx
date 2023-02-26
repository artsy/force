import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerHeaderImage_fairOrganizer$data } from "__generated__/FairOrganizerHeaderImage_fairOrganizer.graphql"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"

interface FairOrganizerHeaderImageProps {
  fairOrganizer: FairOrganizerHeaderImage_fairOrganizer$data
}

export const FairOrganizerHeaderImage: React.FC<FairOrganizerHeaderImageProps> = ({
  fairOrganizer: { profile },
}) => {
  if (profile?.image?.url) {
    return <FullBleedHeader src={profile?.image.url} />
  }

  return null
}

export const FairOrganizerHeaderImageFragmentContainer = createFragmentContainer(
  FairOrganizerHeaderImage,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerHeaderImage_fairOrganizer on FairOrganizer {
        profile {
          image {
            url(version: "wide")
          }
        }
      }
    `,
  }
)
