import { Spacer } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import type { FairOrganizerApp_fairOrganizer$data } from "__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { truncateText } from "Utils/truncateText"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"
import { FairOrganizerHeaderImageFragmentContainer as FairOrganizerHeaderImage } from "./Components/FairOrganizerHeaderImage"
import { FairOrganizerLatestArticlesFragmentContainer as FairOrganizerLatestArticles } from "./Components/FairOrganizerLatestArticles"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "./Components/FairOrganizerPastEventsRail"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer$data
}

const FairOrganizerApp: React.FC<
  React.PropsWithChildren<FairOrganizerAppProps>
> = ({ fairOrganizer }) => {
  const { name, profile, slug, description } = fairOrganizer

  const shouldBlockRobots = !profile?.isPublished

  return (
    <>
      <MetaTags
        description={
          description ? truncateText(description, { length: 200 }) : undefined
        }
        imageURL={profile?.image?.url}
        pathname={`fair-organizer/${slug}`}
        title={`${name} | Artsy`}
        blockRobots={shouldBlockRobots}
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
          isPublished
        }
        ...FairOrganizerPastEventsRail_fairOrganizer
        ...FairOrganizerHeaderImage_fairOrganizer
        ...FairOrganizerHeader_fairOrganizer
        ...FairOrganizerLatestArticles_fairOrganizer
      }
    `,
  },
)
