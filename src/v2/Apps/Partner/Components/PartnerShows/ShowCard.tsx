import { RouterLink } from "v2/System/Router/RouterLink"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowCard_show$data } from "v2/__generated__/ShowCard_show.graphql"

interface ShowCardProps {
  show: ShowCard_show$data
  isResponsive?: boolean
}

const ShowCard: React.FC<ShowCardProps> = ({
  show,
  isResponsive,
}): JSX.Element => {
  const { coverImage, name, isFairBooth, href, exhibitionPeriod } = show
  const showType = isFairBooth ? "fair booth" : "show"

  return (
    <RouterLink to={href} textDecoration="none">
      {coverImage &&
        (isResponsive ? (
          <ResponsiveBox
            aspectWidth={coverImage.medium?.width ?? 4}
            aspectHeight={coverImage.medium?.height ?? 3}
            maxWidth="100%"
          >
            <Image
              lazyLoad
              alt={name ?? undefined}
              width="100%"
              height="100%"
              src={coverImage.medium?.src}
              srcSet={coverImage.medium?.srcSet}
            />
          </ResponsiveBox>
        ) : (
          <Image
            lazyLoad
            alt={name ?? undefined}
            src={coverImage.medium?.src}
            srcSet={coverImage.medium?.srcSet}
            width={coverImage.medium?.width}
            height={coverImage.medium?.height}
          />
        ))}
      {isFairBooth != null && (
        <Text
          as="h5"
          textTransform="capitalize"
          color="black"
          variant="md"
          mt={1}
        >
          {showType}
        </Text>
      )}
      {name && (
        <Text as="h4" variant="lg" color="black">
          {name}
        </Text>
      )}
      {exhibitionPeriod && (
        <Text as="h6" textTransform="capitalize" color="black60" variant="sm">
          {exhibitionPeriod}
        </Text>
      )}
    </RouterLink>
  )
}

export const ShowCardFragmentContainer = createFragmentContainer(ShowCard, {
  show: graphql`
    fragment ShowCard_show on Show {
      href
      name
      isFairBooth
      exhibitionPeriod
      coverImage {
        medium: cropped(width: 320, height: 240) {
          width
          height
          src
          srcSet
        }
      }
    }
  `,
})
