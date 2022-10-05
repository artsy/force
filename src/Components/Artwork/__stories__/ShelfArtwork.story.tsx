import { States } from "storybook-states"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
  ShelfArtworkProps,
} from "Components/Artwork/ShelfArtwork"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { graphql } from "react-relay"
import { maxWidthByArea } from "Utils/resized"
import { SkeletonBox } from "@artsy/palette"

export default {
  title: "Components/ShelfArtwork",
}

export const Default = () => {
  return (
    <States<Partial<ShelfArtworkProps>>
      states={[
        { id: "morris-louis-gamma-delta" },
        { id: "roni-horn-best-witchcraft-is-geometry" },
        // Very tall + narrow
        { id: "barnett-newman-the-moment-from-four-on-plexiglas" },
        // No sale message
        { id: "clyfford-still-ph-950-1" },
      ]}
    >
      {({ id, ...rest }) => {
        return (
          <SystemQueryRenderer<any>
            variables={{ id }}
            placeholder={<ShelfArtworkPlaceholder index={1} {...rest} />}
            query={graphql`
              query ShelfArtworkStoryQuery($id: String!) {
                artwork(id: $id) {
                  ...ShelfArtwork_artwork
                }
              }
            `}
            render={({ error, props }) => {
              if (error) {
                console.error(error)
                return null
              }

              if (!props?.artwork) {
                return <ShelfArtworkPlaceholder index={1} {...rest} />
              }

              return (
                <ShelfArtworkFragmentContainer
                  artwork={props.artwork}
                  {...rest}
                />
              )
            }}
          />
        )
      }}
    </States>
  )
}

export const MaxWidthByArea = () => {
  return (
    <States
      states={[
        { width: 160, height: 90, area: 10000 },
        { width: 90, height: 160, area: 40000 },
        { width: 400, height: 400, area: 10000 },
        { width: 200, height: 400, area: 10000 },
        { width: 400, height: 200, area: 10000 },
        { width: 400, height: 100, area: 10000 },
        { width: 100, height: 400, area: 10000 },
        { width: 10, height: 400, area: 10000 },
        { width: 400, height: 10, area: 10000 },
      ]}
    >
      {({ width, height, area }) => {
        const maxWidth = maxWidthByArea({ area, height, width })
        const scaledHeight = Math.round((height / width) * maxWidth)

        return <SkeletonBox width={maxWidth} height={scaledHeight} />
      }}
    </States>
  )
}
