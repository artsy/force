import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { MyCollectionArtworkSidebar } from "./Components/MyCollectionArtworkSidebar"

export const MyCollectionArtworkFragmentContainer = () => {
  return (
    <>
      <GridColumns>
        <Column span={8}>
          {/* <ArtworkImageBrowserFragmentContainer artwork={artwork} /> */}
          <div
            style={{
              width: "400px",
              height: "400px",
              background: "rebeccapurple",
            }}
          />
          {/* <Media greaterThanOrEqual="sm">{BelowTheFoldArtworkDetails}</Media> */}
        </Column>

        <Column span={4} pt={[0, 2]}>
          <MyCollectionArtworkSidebar />

          {/* <ArtworkSidebarFragmentContainer artwork={artwork} me={me} /> */}
        </Column>
      </GridColumns>
    </>
  )
}
