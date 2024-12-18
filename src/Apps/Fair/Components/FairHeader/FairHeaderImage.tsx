import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairHeaderImage_fair$data } from "__generated__/FairHeaderImage_fair.graphql"
import { FullBleedHeader } from "Components/FullBleedHeader/FullBleedHeader"
import { BREAKPOINTS, Media } from "Utils/Responsive"
import { FullBleed, Image, ResponsiveBox } from "@artsy/palette"
import { Link } from "react-head"
import { resized } from "Utils/resized"

const MOBILE_SIZE = {
  width: 350,
  height: 220,
}

interface FairHeaderImageProps {
  fair: FairHeaderImage_fair$data
}

export const FairHeaderImage: React.FC<
  React.PropsWithChildren<FairHeaderImageProps>
> = ({ fair: { image } }) => {
  if (!image?.url) {
    return null
  }

  const mobile = resized(image.url, {
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
            maxWidth={1000}
            minHeight={MOBILE_SIZE.height}
          >
            <Image
              width="100%"
              height="100%"
              src={mobile.src}
              srcSet={mobile.srcSet}
              fetchPriority="high"
              style={{
                objectFit: "cover",
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
