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
import { getInternalHref } from "Utils/url"

export interface HomeHeroUnitBaseProps {
  title: string
  body: string
  imageUrl?: string | null
  credit?: string | null
  label?: string | null
  link: {
    text: string
    url: {
      desktop: string
      mobile: string
    }
  }
  index: number
  onClick?: () => void
}

const HomeHeroUnitBaseSmall: React.FC<HomeHeroUnitBaseProps> = ({
  title,
  body,
  imageUrl,
  link,
  index,
  onClick,
}) => {
  const image = imageUrl ? cropped(imageUrl, { width: 500, height: 333 }) : null
  const href = getInternalHref(link.url.mobile)

  return (
    <RouterLink
      aria-label={`${title} - ${body}`}
      bg="black5"
      display="block"
      height="100%"
      onClick={onClick}
      textDecoration="none"
      to={href}
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
          {title}
        </Text>

        <Spacer y={1} />

        <Text variant="xs" color="black60" lineClamp={4}>
          {body}
        </Text>

        <Spacer y={1} />

        <Text variant="xs">{link.text}</Text>
      </Box>
    </RouterLink>
  )
}

const HomeHeroUnitBaseLarge: React.FC<HomeHeroUnitBaseProps> = ({
  title,
  body,
  imageUrl,
  credit,
  label,
  link,
  index,
  onClick,
}) => {
  const image = imageUrl
    ? cropped(imageUrl, { width: 1270, height: 500 })
    : null
  const href = getInternalHref(link.url.desktop)
  const { theme } = useTheme()

  const background =
    theme.name === "light"
      ? "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)"
      : "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)"

  return (
    <RouterLink
      aria-label={`${title} - ${body}`}
      display="block"
      onClick={onClick}
      textDecoration="none"
      to={href}
    >
      <GridColumns bg="black5">
        <Column span={6}>
          <Box height={[300, 400, 500]} position="relative" bg="black30">
            {image && (
              <Image
                alt=""
                height="100%"
                src={image.src}
                srcSet={image.srcSet}
                style={{ objectFit: "cover" }}
                width="100%"
                lazyLoad={index > 0}
                fetchPriority={index > 0 ? "auto" : "high"}
              />
            )}

            {credit && (
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
                <HomeHeroUnitCredit>{credit}</HomeHeroUnitCredit>
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
              {label && (
                <>
                  <Text variant="xs">{label}</Text>
                  <Spacer y={1} />
                </>
              )}

              <Text
                as={index === 0 ? "h1" : "h2"}
                lineClamp={3}
                variant={["lg-display", "xl", "xl"]}
              >
                {title}
              </Text>

              <Spacer y={2} />

              <Text
                color="black60"
                lineClamp={4}
                variant={["xs", "sm-display", "lg-display"]}
              >
                {body}
              </Text>

              <Spacer y={[2, 2, 4]} />

              <GridColumns>
                <Column span={[12, 12, 6]}>
                  <Button variant="secondaryBlack" width="100%" tabIndex={-1}>
                    {link.text}
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

export const HomeHeroUnitBase: React.FC<HomeHeroUnitBaseProps> = props => {
  return (
    <Box width="100%" height="100%">
      <Media at="xs">
        <HomeHeroUnitBaseSmall {...props} />
      </Media>

      <Media greaterThan="xs">
        <HomeHeroUnitBaseLarge {...props} />
      </Media>
    </Box>
  )
}

interface HomeHeroUnitProps {
  heroUnit: HomeHeroUnit_heroUnit$data
  index: number
  onClick?: () => void
}

export const HomeHeroUnit: React.FC<HomeHeroUnitProps> = ({
  heroUnit,
  index,
  onClick,
}) => {
  return (
    <HomeHeroUnitBase
      title={heroUnit.title}
      body={heroUnit.body}
      imageUrl={heroUnit.image?.imageURL}
      credit={heroUnit.credit}
      label={heroUnit.label}
      link={{
        text: heroUnit.link.text,
        url: {
          desktop: heroUnit.link.url,
          mobile: heroUnit.link.url,
        },
      }}
      index={index}
      onClick={onClick}
    />
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
