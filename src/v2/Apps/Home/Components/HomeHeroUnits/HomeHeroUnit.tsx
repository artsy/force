import React from "react"
import {
  Box,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Button,
  GridColumns,
  Column,
  HTML,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnit_heroUnit } from "v2/__generated__/HomeHeroUnit_heroUnit.graphql"
import { cropped } from "v2/Utils/resized"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"

export interface HomeHeroUnitProps {
  heroUnit:
    | HomeHeroUnit_heroUnit
    | {
        backgroundImageURL: string
        href: string
        heading: string | JSX.Element
        title: string
        subtitle: string
        linkText?: string
      }
  bg?: "black5" | "black100"
  layout: "a" | "b"
  index: number
}

export const HomeHeroUnit: React.FC<HomeHeroUnitProps> = ({
  heroUnit,
  bg = "black5",
  layout = "a",
  index,
}) => {
  const colorScheme = {
    black5: {
      heading: "black100",
      title: "black100",
      subtitle: "black60",
      button: "secondaryOutline",
      linkText: "black100",
    },
    black100: {
      heading: "white100",
      title: "white100",
      subtitle: "white100",
      button: "primaryWhite",
      linkText: "white100",
    },
  }[bg]

  const image = heroUnit.backgroundImageURL
    ? cropped(heroUnit.backgroundImageURL, {
        // 3:2
        width: 910,
        height: 607,
        quality: 75,
      })
    : null

  const figure = (
    <Column span={6} bg="white100">
      <RouterLink
        to={heroUnit.href ?? ""}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        tabIndex={-1}
      >
        {image && (
          <>
            <Media at="xs">
              <ResponsiveBox
                aspectWidth={3}
                aspectHeight={2}
                maxWidth="100%"
                bg="black10"
              >
                {/* TODO: Include preload tag */}
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width="100%"
                  height="100%"
                  lazyLoad={index > 0}
                />
              </ResponsiveBox>
            </Media>

            <Media greaterThan="xs">
              {className => (
                <Box className={className} height={[300, 400, 500]}>
                  <Image
                    src={image.src}
                    srcSet={image.srcSet}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              )}
            </Media>
          </>
        )}
      </RouterLink>
    </Column>
  )

  const description = (
    <Column span={6}>
      <GridColumns height="100%">
        <Column
          start={[2, 3]}
          span={[10, 8]}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          py={4}
        >
          <RouterLink
            to={heroUnit.href ?? ""}
            tabIndex={-1}
            style={{ display: "block", textDecoration: "none" }}
          >
            <Media greaterThan="xs">
              <Text
                variant="xs"
                textTransform="uppercase"
                color={colorScheme.heading}
              >
                {heroUnit.heading}
              </Text>

              <Spacer mt={2} />
            </Media>

            <Text
              as={index === 0 ? "h1" : "h2"}
              variant={["lg", "xl", "xxl"]}
              color={colorScheme.title}
            >
              {heroUnit.title}
            </Text>

            {heroUnit.subtitle && (
              <>
                <Spacer mt={[1, 2]} />

                <HTML
                  variant={["xs", "md", "lg"]}
                  color={colorScheme.subtitle}
                  html={heroUnit.subtitle}
                />
              </>
            )}
          </RouterLink>

          {heroUnit.linkText && heroUnit.href && (
            <>
              <Media greaterThan="xs">
                <Spacer
                  // Unconventional value here to keep visual rhythm
                  mt="30px"
                />

                <GridColumns>
                  <Column span={[12, 12, 6]}>
                    <Button
                      variant={colorScheme.button as any}
                      // @ts-ignore
                      as={RouterLink}
                      to={heroUnit.href}
                      width="100%"
                    >
                      {heroUnit.linkText}
                    </Button>
                  </Column>
                </GridColumns>
              </Media>

              <Media at="xs">
                <Spacer mt={1} />

                <RouterLink to={heroUnit.href} noUnderline>
                  <Text variant="xs" color={colorScheme.linkText}>
                    {heroUnit.linkText}
                  </Text>
                </RouterLink>
              </Media>
            </>
          )}
        </Column>
      </GridColumns>
    </Column>
  )

  return (
    <GridColumns bg={bg} width="100%">
      {layout === "a" ? (
        <>
          {figure}
          {description}
        </>
      ) : (
        <>
          {description}
          {figure}
        </>
      )}
    </GridColumns>
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
