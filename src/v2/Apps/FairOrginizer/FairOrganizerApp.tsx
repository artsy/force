import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import truncate from "trunc-html"
import { Box, Spacer } from "@artsy/palette"
import { FairOrganizerApp_fairOrganizer$data } from "v2/__generated__/FairOrganizerApp_fairOrganizer.graphql"
import { FairOrganizerHeaderImageFragmentContainer as FairOrganizerHeaderImage } from "./Components/FairOrganizerHeaderImage"
import { FairOrganizerHeaderFragmentContainer as FairOrganizerHeader } from "./Components/FairOrganizerHeader/FairOrganizerHeader"
import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "./Components/FairOrganizerPastEventsRail"
import { FairOrganizerLatestArticlesFragmentContainer as FairOrganizerLatestArticles } from "./Components/FairOrganizerLatestArticles"
import { MetaTags } from "v2/Components/MetaTags"

interface FairOrganizerAppProps {
  fairOrganizer: FairOrganizerApp_fairOrganizer$data
}

const FairOrganizerApp: React.FC<FairOrganizerAppProps> = ({
  fairOrganizer,
}) => {
  const { name, profile, slug, about } = fairOrganizer

  const title = `${name} | Artsy`

  return (
    <>
      <MetaTags
        description={truncate(about, 200).text}
        imageURL={profile?.image?.url}
        pathname={`fair-organizer/${slug}`}
        title={title}
      />

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
        about(format: HTML)
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
