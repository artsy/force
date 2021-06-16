import React from "react"
import {
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Button,
  GridColumns,
  Column,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnit_heroUnit } from "v2/__generated__/HomeHeroUnit_heroUnit.graphql"
import { cropped } from "v2/Utils/resized"
import { RouterLink } from "v2/System/Router/RouterLink"

interface HomeHeroUnitProps {
  heroUnit: HomeHeroUnit_heroUnit
}

export const HomeHeroUnit: React.FC<HomeHeroUnitProps> = ({ heroUnit }) => {
  const image = heroUnit.backgroundImageURL
    ? cropped(heroUnit.backgroundImageURL, {
        width: 910,
        height: 683,
        quality: 75,
      })
    : null

  return (
    <>
      <RouterLink
        to={heroUnit.href ?? ""}
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <ResponsiveBox
          aspectWidth={4}
          aspectHeight={3}
          maxWidth="100%"
          bg="black10"
        >
          {image && (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              width="100%"
              height="100%"
              lazyLoad
            />
          )}
        </ResponsiveBox>
      </RouterLink>

      <Spacer mt={2} />

      <Text variant="xs" textTransform="uppercase">
        {heroUnit.heading}
      </Text>

      <Spacer mt={1} />

      <RouterLink
        to={heroUnit.href ?? ""}
        tabIndex={-1}
        style={{ display: "block", textDecoration: "none" }}
      >
        <Text as="h3" variant="lg">
          {heroUnit.title}
        </Text>
      </RouterLink>

      <Spacer mt={1} />

      <Text variant="sm" color="black60">
        {heroUnit.subtitle}
      </Text>

      <Spacer mt={4} />

      <GridColumns>
        <Column span={8}>
          <Button
            // @ts-ignore
            as={RouterLink}
            to={heroUnit.href}
            width="100%"
          >
            {heroUnit.linkText}
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}

export const HomeHeroUnitFragmentContainer = createFragmentContainer(
  HomeHeroUnit,
  {
    heroUnit: graphql`
      fragment HomeHeroUnit_heroUnit on HomePageHeroUnit {
        backgroundImageURL
        heading
        title
        subtitle
        linkText
        href
        creditLine
      }
    `,
  }
)
