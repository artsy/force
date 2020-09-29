import styled from "styled-components"
import React from "react"
import { ResponsiveValue, system } from "styled-system"
import { Box, ResponsiveBox, Image as __Image__ } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderImage_fair } from "v2/__generated__/FairHeaderImage_fair.graphql"
import { FairHeaderIconFragmentContainer as FairHeaderIcon } from "./FairHeaderIcon"

const ratioPadding = system({
  ratio: {
    property: "paddingBottom",
    transform: n => n * 100 + "%",
  },
})

const AspectRatioBox = styled(Box)<{ ratio?: ResponsiveValue<number> }>`
  position: relative;
  ${ratioPadding}
`

const Image = styled(__Image__)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

interface FairHeaderImageProps {
  fair: FairHeaderImage_fair
}

export const FairHeaderImage: React.FC<FairHeaderImageProps> = ({
  fair,
  fair: { name, image },
}) => {
  if (!image) return null

  return (
    <>
      <Media at="xs">
        <Box position="relative" mx={-2}>
          <AspectRatioBox
            ratio={image._1x.height / image._1x.width}
            bg="black10"
          >
            <Image
              src={image._1x.src}
              srcSet={`${image._1x.src} 1x, ${image._2x.src} 2x`}
              alt={name}
            />

            <FairHeaderIcon fair={fair} />
          </AspectRatioBox>
        </Box>
      </Media>

      <Media greaterThan="xs">
        <ResponsiveBox
          position="relative"
          mx="auto"
          aspectWidth={image._1x.width}
          aspectHeight={image._1x.height}
          maxWidth={375}
          bg="black10"
        >
          <Image
            src={image._1x.src}
            srcSet={`${image._1x.src} 1x, ${image._2x.src} 2x`}
            alt={name}
          />

          <FairHeaderIcon fair={fair} />
        </ResponsiveBox>
      </Media>
    </>
  )
}

export const FairHeaderImageFragmentContainer = createFragmentContainer(
  FairHeaderImage,
  {
    fair: graphql`
      fragment FairHeaderImage_fair on Fair {
        ...FairHeaderIcon_fair
        name
        image {
          _1x: cropped(width: 375, height: 500, version: "wide") {
            src: url
            width
            height
          }
          _2x: cropped(width: 750, height: 1000, version: "wide") {
            src: url
          }
        }
      }
    `,
  }
)
