import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Image, ResponsiveBox, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowCard_show } from "v2/__generated__/ShowCard_show.graphql"

interface ShowCardProps {
  show: ShowCard_show
}

const ShowCard: React.FC<ShowCardProps> = ({ show }): JSX.Element => {
  const { coverImage, name, isFairBooth, href, exhibitionPeriod } = show
  const showType = isFairBooth ? "fair booth" : "show"

  return (
    <RouterLink to={href} noUnderline>
      {coverImage && (
        <ResponsiveBox
          aspectWidth={coverImage.medium.width}
          aspectHeight={coverImage.medium.height}
          maxWidth="100%"
        >
          <Image
            src={coverImage.medium.src}
            srcSet={coverImage.medium.srcSet}
            alt={name}
            width="100%"
            height="100%"
            lazyLoad
          />
        </ResponsiveBox>
      )}
      {isFairBooth != null && (
        <Text
          as="h5"
          textTransform="capitalize"
          color="black"
          variant="mediumText"
          mt={1}
        >
          {showType}
        </Text>
      )}
      {name && (
        <Text as="h4" variant="subtitle" color="black">
          {name}
        </Text>
      )}
      {exhibitionPeriod && (
        <Text as="h6" textTransform="capitalize" color="black60" variant="text">
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
        medium: cropped(width: 263, height: 222) {
          width
          height
          src
          srcSet
        }
      }
    }
  `,
})
