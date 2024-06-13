import {
  Box,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  TextVariant,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { ShowsFeaturedShow_show$data } from "__generated__/ShowsFeaturedShow_show.graphql"
import { ShowsShowDatesFragmentContainer } from "./ShowsShowDates"

interface ShowsFeaturedShowProps {
  show: ShowsFeaturedShow_show$data
  size: "large" | "small"
}

const ShowsFeaturedShow: React.FC<ShowsFeaturedShowProps> = ({
  show,
  size,
}) => {
  const variants = {
    large: {
      primary: "xl" as TextVariant,
      secondary: "lg-display" as TextVariant,
    },
    small: {
      primary: "lg-display" as TextVariant,
      secondary: "sm-display" as TextVariant,
    },
  }[size]
  const image = show.coverImage?.[size]

  return (
    <Container to={show.href ?? ""}>
      {image && (
        <ResponsiveBox
          aspectWidth={image.width}
          aspectHeight={image.height}
          maxWidth="100%"
        >
          <Overlay bg="black100" />

          <Image
            width="100%"
            height="100%"
            src={image.src}
            srcSet={image.srcSet}
            alt={show.coverImage?.title ?? `Cover image for ${show.name}`}
            lazyLoad={size === "small"}
          />
        </ResponsiveBox>
      )}

      <Spacer y={2} />

      {show.partner && (
        <Text variant={variants.primary}>{show.partner.name}</Text>
      )}

      <Text variant={variants.primary} color="black60">
        {show.name}
      </Text>

      <Spacer y={1} />

      <ShowsShowDatesFragmentContainer
        show={show}
        variant={variants.secondary}
      />
    </Container>
  )
}

export const ShowsFeaturedShowFragmentContainer = createFragmentContainer(
  ShowsFeaturedShow,
  {
    show: graphql`
      fragment ShowsFeaturedShow_show on Show {
        ...ShowsShowDates_show
        id
        name
        href
        coverImage {
          title
          large: cropped(
            width: 910
            height: 683
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
            srcSet
          }
          small: cropped(
            width: 600
            height: 450
            version: ["main", "normalized", "larger", "large"]
          ) {
            width
            height
            src
            srcSet
          }
        }
        partner {
          ... on Partner {
            name
          }
          ... on ExternalPartner {
            name
          }
        }
      }
    `,
  }
)

const Overlay = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
  transition: opacity 250ms;
`

const Container = styled(RouterLink)`
  display: block;
  text-decoration: none;

  &:hover {
    ${Overlay} {
      opacity: 0.33;
    }
  }
`
