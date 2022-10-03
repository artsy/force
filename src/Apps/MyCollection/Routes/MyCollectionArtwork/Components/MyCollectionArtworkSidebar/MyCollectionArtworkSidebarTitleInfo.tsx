import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { RouterLink } from "System/Router/RouterLink"
import { MyCollectionArtworkSidebarTitleInfo_artwork$data } from "__generated__/MyCollectionArtworkSidebarTitleInfo_artwork.graphql"

interface MyCollectionArtworkSidebarTitleInfoProps {
  artwork: MyCollectionArtworkSidebarTitleInfo_artwork$data
}

const MyCollectionArtworkSidebarTitleInfo: React.FC<MyCollectionArtworkSidebarTitleInfoProps> = ({
  artwork,
}) => {
  const { artistNames, date, title, artist } = artwork

  return (
    <>
      <Text as="h1" variant="lg-display">
        <RouterLink textDecoration="none" to={artist!.href}>
          {artistNames}
        </RouterLink>
      </Text>
      <Text as="h1" variant="lg-display" color="black60" mb={[0.5, 0]}>
        <i>{title?.trim()}</i>
        {date && date.replace(/\s+/g, "").length > 0 && ", " + date}
      </Text>

      <Spacer m={[4, 2]} />
    </>
  )
}

export const MyCollectionArtworkSidebarTitleInfoFragmentContainer = createFragmentContainer(
  MyCollectionArtworkSidebarTitleInfo,
  {
    artwork: graphql`
      fragment MyCollectionArtworkSidebarTitleInfo_artwork on Artwork {
        artistNames
        title
        date
        artist {
          href
        }
      }
    `,
  }
)
