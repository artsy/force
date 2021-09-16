import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box, Spacer, Title } from "@artsy/palette"
import { FairOrganizerApp_fairOrganizer } from "v2/__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { FairOrganizerHeaderImageFragmentContainer as FairOrganizerHeaderImage } from "./Components/FairOrganizerHeaderImage"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "./Components/FairOrganizerPastEventsRail"
import { FairOrganizerLatestArticlesFragmentContainer as FairOrganizerLatestArticles } from "./Components/FairOrganizerLatestArticles"
import { MetaTags } from "v2/Components/MetaTags"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer
}

const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  fairOrganizer,
}) => {
  const { name, profile, slug } = fairOrganizer

  const title = `${name} | Artsy`

  return (
    <>
      <MetaTags
        description={`Search for fairs on ${name} on Artsy`}
        imageURL={profile?.image?.url}
        pathname={`fair-organizer/${slug}`}
        title={title}
      />

      <Title>{`${title}`}</Title>

      <Box>
        <FairOrganizerHeaderImage fairOrganizer={fairOrganizer} />

        <Spacer mt={4} />

        <FairOrganizerHeader fairOrganizer={fairOrganizer} />

        <Spacer mt={6} />

        <FairOrganizerPastEventsRail fairOrganizer={fairOrganizer} />

        <Spacer mt={140} />

        <FairOrganizerLatestArticles fairOrganizer={fairOrganizer} />
      </Box>
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
