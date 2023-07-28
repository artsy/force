import { Image } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ViewInRoomArtwork_artwork$data } from "__generated__/ViewInRoomArtwork_artwork.graphql"
import { cmToPx } from "./util"

const eyeLevelCm = 144.78 // 57"
const groundLevelCm = 45.72 // 18"
const eyeLevelPx = cmToPx(eyeLevelCm)
const groundLevelPx = cmToPx(groundLevelCm)
const eyeLevelSizeLimit = 200 // cm

interface ViewInRoomArtworkProps {
  artwork: ViewInRoomArtwork_artwork$data
}

const ViewInRoomArtwork: React.FC<ViewInRoomArtworkProps> = ({ artwork }) => {
  const image = artwork.image?.resized

  if (
    !artwork.widthCm ||
    !artwork.heightCm ||
    !image ||
    !image.src ||
    !image.width ||
    !image.height
  ) {
    return null
  }

  const width = cmToPx(artwork.widthCm)
  const height = cmToPx(artwork.heightCm)
  const hangHeight =
    // If too big to hang at eye-level
    artwork.heightCm > eyeLevelSizeLimit
      ? // Bottom edge rests at ground level
        groundLevelPx
      : // Centered on eye-level
        eyeLevelPx - height / 2

  return (
    <Wall>
      <Image
        id="transitionTo--ViewInRoom"
        src={image.src}
        srcSet={image.srcSet}
        alt=""
        style={{
          boxShadow: "1px 5px 5px rgb(0, 0, 0, 0.25)",
          width,
          height,
          marginBottom: hangHeight,
        }}
      />
    </Wall>
  )
}

const Wall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 814px; // Distance from top of wall to interstitial of room
`

export const ViewInRoomArtworkFragmentContainer = createFragmentContainer(
  ViewInRoomArtwork,
  {
    artwork: graphql`
      fragment ViewInRoomArtwork_artwork on Artwork {
        widthCm
        heightCm
        image {
          resized(
            width: 800
            height: 800
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)
