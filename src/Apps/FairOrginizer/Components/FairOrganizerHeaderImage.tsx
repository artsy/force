import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import type { FairOrganizerHeaderImage_fairOrganizer$data } from "__generated__/FairOrganizerHeaderImage_fairOrganizer.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairOrganizerHeaderImageProps {
  fairOrganizer: FairOrganizerHeaderImage_fairOrganizer$data
}

export const FairOrganizerHeaderImage: React.FC<
  React.PropsWithChildren<FairOrganizerHeaderImageProps>
> = ({ fairOrganizer: { profile } }) => {
  if (profile?.image?.url) {
    return <FullBleedHeader src={profile?.image.url} />
  }

  return null
}

export const FairOrganizerHeaderImageFragmentContainer =
  createFragmentContainer(FairOrganizerHeaderImage, {
    fairOrganizer: graphql`
      fragment FairOrganizerHeaderImage_fairOrganizer on FairOrganizer {
        profile {
          image {
            url(version: "wide")
          }
        }
      }
    `,
  })
