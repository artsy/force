import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { cropped } from "Utils/resized"
import { getInternalHref } from "Utils/url"
import type { ClickedHeroUnitGroup } from "@artsy/cohesion"
import { ActionType, OwnerType } from "@artsy/cohesion"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import type { HomeHeroUnit_heroUnit$data } from "__generated__/HomeHeroUnit_heroUnit.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { HomeHeroUnitCredit } from "./HomeHeroUnitCredit"

export interface HomeHeroUnitBaseProps {
  title: string
  body: string
  imageUrl?: string | null
  credit?: string | null
  label?: string | null
  link: {
    desktop: {
      text: string
      url: string
      onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
    }
    mobile: {
      text: string
      url: string
      onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
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
  const href = getInternalHref(link.mobile.url)

  const { trackEvent } = useTracking()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    link.mobile.onClick?.(event)

    const payload: ClickedHeroUnitGroup = {
      action: ActionType.clickedHeroUnitGroup,
      context_module: "heroUnitsRail",
      context_page_owner_type: OwnerType.home,
      destination_path: href,
      horizontal_slide_position: index,
      type: "thumbnail",
    }

    trackEvent(payload)
  }

  return (
    <RouterLink
      aria-label={`${title} - ${body}`}
      bg="mono5"
      display="block"
      height="100%"
      onClick={handleClick}
      textDecoration="none"
      to={href}
      width="100%"
    >
      <ResponsiveBox
        aspectHeight={2}
        aspectWidth={3}
        bg="mono30"
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

        <Text variant="xs" color="mono60" lineClamp={4}>
          {body}
        </Text>

        <Spacer y={1} />

        <Text variant="xs">{link.mobile.text}</Text>
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
  const href = getInternalHref(link.desktop.url)
  const { theme } = useTheme()

  const background =
    theme.name === "light"
      ? "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)"
      : "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)"

  const { trackEvent } = useTracking()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.()
    link.desktop.onClick?.(event)

    const payload: ClickedHeroUnitGroup = {
      action: ActionType.clickedHeroUnitGroup,
      context_module: "heroUnitsRail",
      context_page_owner_type: OwnerType.home,
      destination_path: href,
      horizontal_slide_position: index,
      type: "thumbnail",
    }

    trackEvent(payload)
  }

  return (
    <RouterLink
      aria-label={`${title} - ${body}`}
      display="block"
      onClick={handleClick}
      textDecoration="none"
      to={href}
    >
      <GridColumns bg="mono5">
        <Column span={6}>
          <Box height={[300, 400, 500]} position="relative" bg="mono30">
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
                color="mono60"
                lineClamp={4}
                variant={["xs", "sm-display", "lg-display"]}
              >
                {body}
              </Text>

              <Spacer y={[2, 2, 4]} />

              <GridColumns>
                <Column span={[12, 12, 6]}>
                  <Button variant="secondaryBlack" width="100%" tabIndex={-1}>
                    {link.desktop.text}
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
        desktop: {
          text: heroUnit.link.text,
          url: heroUnit.link.url,
        },
        mobile: {
          text: heroUnit.link.text,
          url: heroUnit.link.url,
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
  },
)
