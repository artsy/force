import {
  BoxProps,
  Button,
  Column,
  GridColumns,
  Image,
  ReadMore,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ShowBanner_show } from "v2/__generated__/ShowBanner_show.graphql"

const statusLabelsMap = {
  running: "current",
  upcoming: "upcoming",
  closed: "past",
}

interface ShowBannerProps extends BoxProps {
  show: ShowBanner_show
}

const ShowBanner: React.FC<ShowBannerProps> = ({
  show,
  ...rest
}): JSX.Element => {
  const {
    coverImage,
    name,
    isFairBooth,
    location,
    exhibitionPeriod,
    status,
    description,
    href,
  } = show
  const showType = `${statusLabelsMap[status]} ${
    isFairBooth ? "fair booth" : "show"
  }`

  return (
    <GridColumns gridRowGap={[3, 2]} {...rest}>
      <Column span={6}>
        <Text textTransform="capitalize" variant="mediumText" mb={1}>
          {showType}
        </Text>
        <RouterLink to={href} noUnderline>
          {name && <Text variant="largeTitle">{name}</Text>}
          {exhibitionPeriod && (
            <Text color="black60" variant="title">
              {exhibitionPeriod}
            </Text>
          )}
          {location && location.city && (
            <Text color="black60" variant="subtitle" textTransform="capitalize">
              {location.city}
            </Text>
          )}
          {description && (
            <Text mt={1}>
              <ReadMore maxChars={280} content={description} />
            </Text>
          )}
        </RouterLink>

        <GridColumns mt={[2, 3]}>
          <Column span={6}>
            <RouterLink to={href}>
              <Button width="100%">View More</Button>
            </RouterLink>
          </Column>
        </GridColumns>
      </Column>
      {coverImage && coverImage.medium && (
        <Column span={6}>
          <RouterLink to={href}>
            <Image
              src={coverImage.medium.src}
              srcSet={coverImage.medium.srcSet}
              alt={name}
              width="100%"
              height={[280, 480]}
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </RouterLink>
        </Column>
      )}
    </GridColumns>
  )
}

export const ShowBannerFragmentContainer = createFragmentContainer(ShowBanner, {
  show: graphql`
    fragment ShowBanner_show on Show {
      slug
      name
      href
      isFairBooth
      exhibitionPeriod
      status
      description
      location {
        city
      }
      coverImage {
        medium: cropped(width: 600, height: 480) {
          src
          srcSet
        }
      }
    }
  `,
})
