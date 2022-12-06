import { Join, Spacer } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistCVGroupRefetchContainer } from "./Components/ArtistCVGroup"
import { ArtistCVRoute_viewer$data } from "__generated__/ArtistCVRoute_viewer.graphql"
import { MetaTags } from "Components/MetaTags"
import { useTranslation } from "react-i18next"

interface ArtistCVRouteProps {
  viewer: ArtistCVRoute_viewer$data
}

const ArtistCVRoute: React.FC<ArtistCVRouteProps> = ({ viewer }) => {
  const { t } = useTranslation()

  return (
    <>
      <MetaTags title={`${viewer?.soloShows?.name} - CV | Artsy`} />

      <Join separator={<Spacer y={4} />}>
        <ArtistCVGroupRefetchContainer
          artist={viewer.soloShows!}
          title={t("artistPage.cv.soloTitle")}
        />

        <ArtistCVGroupRefetchContainer
          artist={viewer.groupShows!}
          title={t("artistPage.cv.groupTitle")}
        />

        <ArtistCVGroupRefetchContainer
          artist={viewer.fairBooths!}
          title={t("artistPage.cv.fairTitle")}
        />
      </Join>
    </>
  )
}

export const ArtistCVRouteFragmentContainer = createFragmentContainer(
  ArtistCVRoute,
  {
    viewer: graphql`
      fragment ArtistCVRoute_viewer on Viewer
        @argumentDefinitions(
          soloShowsAtAFair: { type: "Boolean", defaultValue: false }
          soloShowsSoloShow: { type: "Boolean", defaultValue: true }
          groupShowsAtAFair: { type: "Boolean", defaultValue: false }
          fairBoothsAtAFair: { type: "Boolean", defaultValue: true }
        ) {
        soloShows: artist(id: $artistID) {
          ...ArtistCVGroup_artist
            @arguments(atAFair: $soloShowsAtAFair, soloShow: $soloShowsSoloShow)
          name
        }
        groupShows: artist(id: $artistID) {
          ...ArtistCVGroup_artist @arguments(atAFair: $groupShowsAtAFair)
        }
        fairBooths: artist(id: $artistID) {
          ...ArtistCVGroup_artist @arguments(atAFair: $fairBoothsAtAFair)
        }
      }
    `,
  }
)
