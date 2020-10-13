import React from "react"
import { Image, ResponsiveBox } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCard_fair } from "v2/__generated__/FairCard_fair.graphql"

interface FairHeaderImageProps {
  fair: FairCard_fair
}

export const FairCard: React.FC<FairHeaderImageProps> = ({
  fair: { name, image },
}) => {
  return (
    <ResponsiveBox
      aspectWidth={3}
      aspectHeight={2}
      maxWidth="100%"
      bg="black60"
    >
      <Image
        src={image._1x.src}
        srcSet={`${image._1x.src} 1x, ${image._2x.src} 2x`}
        alt={name}
        lazyLoad
        borderRadius="4px"
      />
    </ResponsiveBox>
  )
}

export const FairCardFragmentContainer = createFragmentContainer(FairCard, {
  fair: graphql`
    fragment FairCard_fair on Fair {
      name
      image {
        # Width = largest possible size, full width at 'xs' breakpoint.
        # Height = Width / 1.5
        _1x: cropped(width: 768, height: 512, version: "wide") {
          src: url
        }
        # Above dimension multiplied by 2 for retina.
        _2x: cropped(width: 1536, height: 1024, version: "wide") {
          src: url
        }
      }
    }
  `,
})
