import * as React from "react"
import {
  Box,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Button,
  GridColumns,
  Column,
  useTheme,
} from "@artsy/palette"
import { cropped } from "Utils/resized"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { HomeHeroUnitCredit } from "./HomeHeroUnitCredit"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnit_heroUnit$data } from "__generated__/HomeHeroUnit_heroUnit.graphql"

interface HomeHeroUnitProps {
  heroUnit: HomeHeroUnit_heroUnit$data
  index: number
  onClick?: () => void
}

export const HomeHeroUnit: React.FC<HomeHeroUnitProps> = props => {
  return (
    <Box width="100%" height="100%">
      <Media at="xs">
        <HomeHeroUnitSmall {...props} />
      </Media>

      <Media greaterThan="xs">
        <HomeHeroUnitLarge {...props} />
      </Media>
    </Box>
  )
}

const HomeHeroUnitSmall: React.FC<HomeHeroUnitProps> = ({
  heroUnit,
  index,
  onClick,
}) => {
  const imageUrl = heroUnit.image?.imageURL
  const image = imageUrl && cropped(imageUrl, { width: 500, height: 333 })

  return (
    <RouterLink
      aria-label={`${heroUnit.title} - ${heroUnit.body}`}
      bg="black5"
      display="block"
      height="100%"
      onClick={onClick}
      textDecoration="none"
      to={heroUnit.link.url}
      width="100%"
    >
      <ResponsiveBox
        aspectHeight={2}
        aspectWidth={3}
        bg="black30"
        maxWidth="100%"
      >
        {image && (
          <Image
            alt=""
            height="100%"
            lazyLoad={index > 0}
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
          />
        )}
      </ResponsiveBox>

      <Box p={4}>
        <Text as={index === 0 ? "h1" : "h2"} variant="lg-display" lineClamp={3}>
          {heroUnit.title}
        </Text>

        <Spacer y={1} />

        <Text variant="xs" color="black60" lineClamp={4}>
          {heroUnit.body}
        </Text>

        <Spacer y={1} />

        <Text variant="xs">{heroUnit.link.text}</Text>
      </Box>
    </RouterLink>
  )
}

const HomeHeroUnitLarge: React.FC<HomeHeroUnitProps> = ({
  heroUnit,
  index,
  onClick,
}) => {
  const imageUrl = heroUnit.image?.imageURL
  const image = imageUrl && cropped(imageUrl, { width: 1270, height: 500 })

  const { theme } = useTheme()

  const background =
    theme.name === "light"
      ? "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)"
      : "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)"

  return (
    <RouterLink
      aria-label={`${heroUnit.title} - ${heroUnit.body}`}
      display="block"
      onClick={onClick}
      textDecoration="none"
      to={heroUnit.link.url}
    >
      <GridColumns bg="black5">
        <Column span={6}>
          <Box height={[300, 400, 500]} position="relative" bg="black30">
            {image && (
              <Image
                alt=""
                height="100%"
                lazyLoad={index > 0}
                src={image.src}
                srcSet={image.srcSet}
                style={{ objectFit: "cover" }}
                width="100%"
              />
            )}

            {heroUnit.credit && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                px={2}
                pb={1}
                pt={6}
                background={background}
              >
                <HomeHeroUnitCredit>{heroUnit.credit}</HomeHeroUnitCredit>
              </Box>
            )}
          </Box>
        </Column>

        <Column span={6}>
          <GridColumns height="100%">
            <Column
              display="flex"
              flexDirection="column"
              justifyContent="center"
              py={4}
              span={8}
              start={3}
            >
              {heroUnit.label && (
                <>
                  <Text variant="xs">{heroUnit.label}</Text>

                  <Spacer y={1} />
                </>
              )}

              <Text
                as={index === 0 ? "h1" : "h2"}
                lineClamp={3}
                variant={["lg-display", "xl", "xl"]}
              >
                {heroUnit.title}
              </Text>

              <Spacer y={2} />

              <Text
                color="black60"
                lineClamp={4}
                variant={["xs", "sm-display", "lg-display"]}
              >
                {heroUnit.body}
              </Text>

              <Spacer y={[2, 2, 4]} />

              <GridColumns>
                <Column span={[12, 12, 6]}>
                  <Button variant="secondaryBlack" width="100%" tabIndex={-1}>
                    {heroUnit.link.text}
                  </Button>
                </Column>
              </GridColumns>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </RouterLink>
  )
}

export const HomeHeroUnitFragmentContainer = createFragmentContainer(
  HomeHeroUnit,
  {
    heroUnit: graphql`
      fragment HomeHeroUnit_heroUnit on HeroUnit {
        body
        credit
        image {
          imageURL
        }
        label
        link {
          text
          url
        }
        title
      }
    `,
  }
)
