import { Flex, Sans, space } from "@artsy/palette"
import React from "react"
import styled from "styled-components"

import { IconImageSet } from "v2/Components/Publishing/Icon/IconImageSet"
import { Media } from "v2/Utils/Responsive"
import { ImageSetPreviewProps } from "./ImageSetPreview"

export const ImageSetLabel = (props: ImageSetPreviewProps) => {
  const {
    color,
    section: { images, title },
  } = props
  const label = images.length === 1 ? "Image" : "Images"
  const imageCount = `${images.length} ${label}`
  const primaryTitle = title ? title : imageCount
  const textColor = color !== "white" ? color : undefined

  return (
    <LabelWrapper alignItems="center" justifyContent="space-between">
      <Flex flexDirection="column" justifyContent="space-between">
        <SlideshowTitle
          size={["4", "5"]}
          weight="medium"
          pb={2}
          color={textColor}
        >
          {primaryTitle}
        </SlideshowTitle>

        <SlideshowCta>
          <Sans size={["2", "3"]} weight="medium" color={textColor}>
            View Slideshow
          </Sans>
          {title && (
            <Sans size={["2", "3"]} pl={20} color={textColor}>
              {imageCount}
            </Sans>
          )}
        </SlideshowCta>
      </Flex>

      <Media greaterThanOrEqual="sm">
        <IconContainer>
          <IconImageSet color={textColor} />
        </IconContainer>
      </Media>
    </LabelWrapper>
  )
}

export const IconContainer = styled.div`
  height: 45px;
  position: relative;
  margin-left: ${space(4)}px;
  text-align: right;

  > svg {
    height: 98%;
  }
`

export const LabelWrapper = styled(Flex)`
  padding: ${space(2)}px;
  width: 100%;
`

// exported for targeting from outside components
export const SlideshowTitle = styled(Sans)``
export const SlideshowCta = styled(Flex)``
