import * as React from "react"
import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Box,
  Button,
  Column,
  FullBleed,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Tab,
  Tabs,
  Text,
  useTheme,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { FairsIndex_featuredFairs$data } from "__generated__/FairsIndex_featuredFairs.graphql"
import { FairsIndex_viewer$data } from "__generated__/FairsIndex_viewer.graphql"
import { FairsFairBannerFragmentContainer } from "Apps/Fairs/Components/FairsFairBanner"
import { FairsFairRowFragmentContainer } from "Apps/Fairs/Components/FairsFairRow"
import { FairsPhonePromo } from "Apps/Fairs/Components/FairsPhonePromo"
import { FairsPromoCarousel } from "Apps/Fairs/Components/FairsPromoCarousel"
import { FairsMeta } from "Apps/Fairs/Components/FairsMeta"
import { FairsPastFairsPaginationContainer } from "Apps/Fairs/Components/FairsPastFairs"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { compact } from "lodash"
import { cropped } from "Utils/resized"
import { useAuthDialog } from "Components/AuthDialog"

interface FairsIndexProps {
  featuredFairs: FairsIndex_featuredFairs$data
  viewer: FairsIndex_viewer$data
}

export const FairsIndex: React.FC<FairsIndexProps> = ({
  featuredFairs,
  viewer,
}) => {
  const { user } = useSystemContext()
  const isLoggedIn = Boolean(user)

  const promoSlides = compact(featuredFairs[0]?.items)
  const runningFairs = compact(viewer.runningFairs)
  const closedFairs = compact(viewer.closedFairs)
  const upcomingFairs = compact(viewer.upcomingFairs).filter(fair => {
    return fair.isPublished
  })

  const currentFairs = [
    ...runningFairs.filter(
      fair =>
        fair.isPublished &&
        fair.profile?.isPublished &&
        fair.bannerSize === "x-large"
    ),
    ...runningFairs.filter(
      fair =>
        fair.isPublished &&
        fair.profile?.isPublished &&
        fair.bannerSize !== "x-large"
    ),
  ]

  const mobileHeaderBg = cropped(
    "https://files.artsy.net/images/fairs-header-img.jpg",
    { width: 767, height: 431 }
  )

  const { showAuthDialog } = useAuthDialog()

  const { theme } = useTheme()

  return (
    <>
      <FairsMeta />

      <Media lessThan="sm">
        <FullBleed>
          <ResponsiveBox
            aspectWidth={16}
            aspectHeight={9}
            maxWidth="100%"
            position="relative"
          >
            <Image
              src={mobileHeaderBg.src}
              srcSet={mobileHeaderBg.srcSet}
              width="100%"
              height="100%"
              alt=""
              lazyLoad
            />

            <Text
              variant="lg-display"
              as="h1"
              color="white100"
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              style={{
                background: theme.effects.overlayGradient,
                textShadow: theme.effects.textShadow,
              }}
            >
              Collect from leading art fairs on Artsy
            </Text>
          </ResponsiveBox>
        </FullBleed>

        {currentFairs.length === 0 && !isLoggedIn && (
          <Box textAlign="center">
            <Text my={2}>Get notified when fair previews open</Text>

            <Box my={2}>
              <RouterLink to="/sign_up?intent=signup&contextModule=fairsHeader">
                <Button
                  display="block"
                  width="100%"
                  variant="primaryBlack"
                  tabIndex={-1}
                >
                  Sign up
                </Button>
              </RouterLink>
            </Box>
          </Box>
        )}

        <Box my={2}>
          <Tabs>
            {currentFairs.length !== 0 && (
              <Tab name="Current">
                {currentFairs.map(fair => (
                  <FairsFairRowFragmentContainer
                    key={fair.internalID}
                    fair={fair}
                  />
                ))}
              </Tab>
            )}
            {upcomingFairs.length !== 0 && (
              <Tab name="Upcoming">
                {upcomingFairs.map(fair => (
                  <FairsFairRowFragmentContainer
                    key={fair.internalID}
                    fair={fair}
                  />
                ))}
              </Tab>
            )}

            {closedFairs.length !== 0 && (
              <Tab name="Past">
                {closedFairs.map(fair => (
                  <FairsFairRowFragmentContainer
                    key={fair.internalID}
                    fair={fair}
                  />
                ))}
              </Tab>
            )}
          </Tabs>
        </Box>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Spacer y={4} />

        <Box my={2}>
          {currentFairs.length === 0 && (
            <GridColumns>
              <Column
                span={6}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Text variant="lg-display" px={4} mb={2}>
                  {isLoggedIn
                    ? "Preview and collect from the world's leading art fairs"
                    : "Sign up to follow fairs and be the first to preview them on Artsy"}
                </Text>

                {!isLoggedIn && (
                  <Button
                    variant="secondaryBlack"
                    onClick={() => {
                      showAuthDialog({
                        mode: "SignUp",
                        analytics: {
                          contextModule: ContextModule.fairsHeader,
                          intent: Intent.signup,
                        },
                      })
                    }}
                  >
                    Sign up
                  </Button>
                )}
              </Column>

              <Column span={6}>
                <FairsPromoCarousel>
                  {promoSlides.map((slide, i) => {
                    if (!slide.image?.cropped) return <></>

                    return (
                      <ResponsiveBox
                        key={slide.internalID ?? i}
                        aspectWidth={4}
                        aspectHeight={3}
                        maxWidth="100%"
                        width="100%"
                        bg="black10"
                      >
                        <Image
                          src={slide.image.cropped.src}
                          srcSet={slide.image.cropped.srcSet}
                          width="100%"
                          height="100%"
                          alt=""
                          lazyLoad
                        />
                      </ResponsiveBox>
                    )
                  })}
                </FairsPromoCarousel>
              </Column>
            </GridColumns>
          )}

          {currentFairs.length > 0 && (
            <>
              <Text as="h1" variant="xl" my={2}>
                Current Fairs & Events
              </Text>

              <GridColumns my={2}>
                {currentFairs.map(fair => {
                  return (
                    <Column
                      key={fair.internalID}
                      span={fair.bannerSize === "x-large" ? 12 : 6}
                    >
                      <FairsFairBannerFragmentContainer fair={fair} />
                    </Column>
                  )
                })}

                {
                  // Avoids orphaned CTA
                  currentFairs[currentFairs.length - 1].bannerSize !==
                    "x-large" && (
                    <Column span={6}>
                      <FairsPhonePromo pt={2} />
                    </Column>
                  )
                }
              </GridColumns>
            </>
          )}
        </Box>

        <GridColumns my={4}>
          <Column span={8}>
            <Text
              as={currentFairs.length > 0 ? "h2" : "h1"}
              variant="lg-display"
              pb={2}
              borderBottom="1px solid"
              borderColor="black10"
            >
              Past Events
            </Text>

            <FairsPastFairsPaginationContainer viewer={viewer} />
          </Column>

          <Column start={9} span={4}>
            <Text
              as="h2"
              variant="lg-display"
              pb={2}
              borderBottom="1px solid"
              borderColor="black10"
            >
              Upcoming Events
            </Text>

            {upcomingFairs.map(fair => {
              return (
                <Text key={fair.internalID} my={2} variant="sm">
                  {fair.organizer?.profile?.href ? (
                    <RouterLink inline to={fair.organizer.profile.href}>
                      {fair.name}
                    </RouterLink>
                  ) : (
                    fair.name
                  )}

                  <Box>{fair.exhibitionPeriod}</Box>
                  {fair.location && <Box>{fair.location.city}</Box>}
                </Text>
              )
            })}
          </Column>
        </GridColumns>
      </Media>
    </>
  )
}
export const FairsIndexFragmentContainer = createFragmentContainer(FairsIndex, {
  featuredFairs: graphql`
    fragment FairsIndex_featuredFairs on OrderedSet @relay(plural: true) {
      items {
        ... on FeaturedLink {
          internalID
          title
          image {
            cropped(width: 547, height: 410) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    }
  `,
  viewer: graphql`
    fragment FairsIndex_viewer on Viewer {
      runningFairs: fairs(
        hasListing: true
        hasFullFeature: true
        sort: START_AT_DESC
        size: 25
        status: RUNNING
      ) {
        internalID
        bannerSize
        isPublished
        profile {
          isPublished
        }
        ...FairsFairBanner_fair
        ...FairsFairRow_fair
      }
      closedFairs: fairs(
        hasListing: true
        hasFullFeature: true
        sort: START_AT_DESC
        size: 25
        status: CLOSED
      ) {
        internalID
        isPublished
        profile {
          isPublished
        }
        ...FairsFairRow_fair
      }
      upcomingFairs: fairs(
        hasListing: true
        hasFullFeature: true
        sort: START_AT_ASC
        size: 25
        status: UPCOMING
      ) {
        internalID
        name
        exhibitionPeriod
        location {
          city
        }
        isPublished
        profile {
          isPublished
        }
        organizer {
          profile {
            href
          }
        }
        ...FairsFairRow_fair
      }
      ...FairsPastFairs_viewer
    }
  `,
})
