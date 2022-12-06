import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { truncate } from "lodash"
import { Spacer } from "@artsy/palette"
import { FairOrganizerApp_fairOrganizer$data } from "__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { FairOrganizerHeaderImageFragmentContainer as FairOrganizerHeaderImage } from "./Components/FairOrganizerHeaderImage"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "./Components/FairOrganizerPastEventsRail"
import { FairOrganizerLatestArticlesFragmentContainer as FairOrganizerLatestArticles } from "./Components/FairOrganizerLatestArticles"
import { MetaTags } from "Components/MetaTags"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer$data
}

const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  fairOrganizer,
}) => {
  const { name, profile, slug, description } = fairOrganizer

  return (
    <>
      <MetaTags
        description={
          description ? truncate(description, { length: 200 }) : undefined
        }
        imageURL={profile?.image?.url}
        pathname={`fair-organizer/${slug}`}
        title={`${name} | Artsy`}
      />

      <FairOrganizerHeaderImage fairOrganizer={fairOrganizer} />

      <Spacer y={4} />

      <FairOrganizerHeader fairOrganizer={fairOrganizer} />

      <Spacer y={6} />

      <FairOrganizerPastEventsRail fairOrganizer={fairOrganizer} />

      <Spacer y={12} />

      <FairOrganizerLatestArticles fairOrganizer={fairOrganizer} />
    </>
  )
}

export const FairOrganizerAppFragmentContainer = createFragmentContainer(
  FairOrganizerApp,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerApp_fairOrganizer on FairOrganizer {
        name
        slug
        description: about(format: PLAIN)
        profile {
          image {
            url(version: "wide")
          }
        }
        ...FairOrganizerPastEventsRail_fairOrganizer
        ...FairOrganizerHeaderImage_fairOrganizer
        ...FairOrganizerHeader_fairOrganizer
        ...FairOrganizerLatestArticles_fairOrganizer
      }
    `,
  }
)
