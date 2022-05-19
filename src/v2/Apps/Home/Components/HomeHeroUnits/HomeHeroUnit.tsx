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
} from "@artsy/palette"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeHeroUnit_heroUnit } from "v2/__generated__/HomeHeroUnit_heroUnit.graphql"
import { cropped } from "v2/Utils/resized"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { HomeHeroUnitCredit } from "./HomeHeroUnitCredit"
import { useTracking } from "v2/System"
import {
  ActionType,
  ClickedPromoSpace,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useCallback, useMemo } from "react"

export interface StaticHeroUnit {
  backgroundImageURL: string
  href: string
  heading?: string | JSX.Element
  title: string
  subtitle: string
  linkText?: string
  creditLine?: string
}

export interface HomeHeroUnitProps {
  heroUnit: HomeHeroUnit_heroUnit | StaticHeroUnit
  layout: "a" | "b"
  index: number
}

export const HomeHeroUnit: React.FC<HomeHeroUnitProps> = ({
  heroUnit,
  layout = "a",
  index,
}) => {
  const { trackEvent } = useTracking()

  const handleTrackEvent = useCallback(() => {
    const event: ClickedPromoSpace = {
      action: ActionType.clickedPromoSpace,
      context_module: ContextModule.banner,
      context_screen_owner_type: OwnerType.home,
      destination_path: heroUnit.href ?? "",
      subject: "clicking on the promo banner",
    }
    trackEvent(event)
  }, [heroUnit.href, trackEvent])

  const image = heroUnit.backgroundImageURL
    ? cropped(heroUnit.backgroundImageURL, {
        // 3:2
        width: 910,
        height: 607,
        quality: 75,
      })
    : null

  const figure = useMemo(
    () => (
      <Column span={6} bg="white100">
        <RouterLink
          to={heroUnit.href ?? ""}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
          tabIndex={-1}
          onClick={handleTrackEvent}
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
                  <Box
                    className={className}
                    height={[300, 400, 500]}
                    position="relative"
                  >
                    <Image
                      src={image.src}
                      srcSet={image.srcSet}
                      width="100%"
                      height="100%"
                      style={{ objectFit: "cover" }}
                      lazyLoad={index > 0}
                    />

                    {heroUnit.creditLine && (
                      <Box
                        position="absolute"
                        px={2}
                        pb={1}
                        pt={6}
                        width="100%"
                        bottom={0}
                        background="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);"
                        {...(layout === "a" ? { left: 0 } : { right: 0 })}
                      >
                        <HomeHeroUnitCredit>
                          {heroUnit.creditLine}
                        </HomeHeroUnitCredit>
                      </Box>
                    )}
                  </Box>
                )}
              </Media>
            </>
          )}
        </RouterLink>
      </Column>
    ),
    [handleTrackEvent, heroUnit.creditLine, heroUnit.href, image, index, layout]
  )

  const description = useMemo(
    () => (
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
              onClick={handleTrackEvent}
            >
              <Media greaterThan="xs">
                {heroUnit.heading && (
                  <>
                    <Text
                      variant="xs"
                      textTransform="uppercase"
                      color="black100"
                    >
                      {heroUnit.heading}
                    </Text>

                    <Spacer mt={2} />
                  </>
                )}
              </Media>

              <Text
                as={index === 0 ? "h1" : "h2"}
                variant={["lg-display", "xl", "xl"]}
                color="black100"
                lineClamp={3}
              >
                {heroUnit.title}
              </Text>

              {heroUnit.subtitle && (
                <>
                  <Spacer mt={[1, 2]} />

                  <Text
                    variant={["xs", "sm-display", "lg-display"]}
                    color="black60"
                    lineClamp={4}
                  >
                    {heroUnit.subtitle}
                  </Text>
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
                        variant="secondaryOutline"
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

                  <RouterLink
                    to={heroUnit.href}
                    noUnderline
                    onClick={handleTrackEvent}
                  >
                    <Text variant="xs" color="black100">
                      {heroUnit.linkText}
                    </Text>
                  </RouterLink>
                </Media>
              </>
            )}
          </Column>
        </GridColumns>
      </Column>
    ),
    [
      handleTrackEvent,
      heroUnit.heading,
      heroUnit.href,
      heroUnit.linkText,
      heroUnit.subtitle,
      heroUnit.title,
      index,
    ]
  )

  return (
    <>
      {image && index === 0 && (
        <Link
          rel="preload"
          as="image"
          href={image.src}
          imagesrcset={image.srcSet}
        />
      )}

      <GridColumns bg="black5" width="100%">
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

export const LOGGED_OUT_HERO_UNIT: StaticHeroUnit = {
  title: "Collect art by the world’s leading artists",
  subtitle: "Register for updates on available works, market news, and more.",
  href: "/signup",
  linkText: "Sign Up",
  backgroundImageURL: "http://files.artsy.net/homepage/signup-banner.png",
}
