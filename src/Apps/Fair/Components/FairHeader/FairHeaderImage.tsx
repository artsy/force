import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderImage_fair$data } from "__generated__/FairHeaderImage_fair.graphql"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { BREAKPOINTS, Media } from "Utils/Responsive"
import { FullBleed, Image, ResponsiveBox } from "@artsy/palette"
import { Link } from "react-head"
import { cropped } from "Utils/resized"

const MOBILE_SIZE = {
  width: 450,
  height: 320,
}

interface FairHeaderImageProps {
  fair: FairHeaderImage_fair$data
}

export const FairHeaderImage: React.FC<FairHeaderImageProps> = ({
  fair: { image },
}) => {
  if (!image?.url) {
    return null
  }

  const mobile = cropped(image.url, {
    width: MOBILE_SIZE.width,
    height: MOBILE_SIZE.height,
    quality: 60,
  })

  return (
    <>
      <Link
        rel="preload"
        href={mobile.src}
        as="image"
        imagesrcset={mobile.srcSet}
        media={`(max-width: ${BREAKPOINTS.sm}px)`}
      />

      <Media at="xs">
        <FullBleed>
          <ResponsiveBox
            aspectWidth={MOBILE_SIZE.width}
            aspectHeight={MOBILE_SIZE.height}
            maxWidth={700}
            minWidth={MOBILE_SIZE.width}
            maxHeight={MOBILE_SIZE.height}
            minHeight={MOBILE_SIZE.height}
          >
            <Image
              width="100%"
              height="100%"
              src={mobile.src}
              srcSet={mobile.srcSet}
              fetchPriority="high"
              style={{
                minWidth: MOBILE_SIZE.width,
                minHeight: MOBILE_SIZE.height,
              }}
            />
          </ResponsiveBox>
        </FullBleed>
      </Media>

      <Media greaterThan="xs">
        <FullBleedHeader src={image.url} />
      </Media>
    </>
  )
}

export const FairHeaderImageFragmentContainer = createFragmentContainer(
  FairHeaderImage,
  {
    fair: graphql`
      fragment FairHeaderImage_fair on Fair {
        image {
          url(version: "wide")
        }
      }
    `,
  }
)
