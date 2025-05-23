import { Image, ResponsiveBox } from "@artsy/palette"
import type { FairCard_fair$data } from "__generated__/FairCard_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairHeaderImageProps {
  fair: FairCard_fair$data
}

// TODO: Remove
export const FairCard: React.FC<
  React.PropsWithChildren<FairHeaderImageProps>
> = ({ fair: { name, image } }) => {
  return (
    <ResponsiveBox
      aspectWidth={3}
      aspectHeight={2}
      maxWidth="100%"
      bg="mono10"
      borderRadius={4}
    >
      {image && (
        <Image
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          src={image.cropped.src}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          srcSet={image.cropped.srcSet}
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          alt={name}
          lazyLoad
          borderRadius={4}
        />
      )}
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
        cropped(width: 768, height: 512, version: "wide") {
          src
          srcSet
        }
      }
    }
  `,
})
