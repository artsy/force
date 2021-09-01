import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Box,
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Tab,
  Tabs,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ModalType } from "v2/Components/Authentication/Types"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { Media } from "v2/Utils/Responsive"
import { FairsIndex_featuredFairs } from "v2/__generated__/FairsIndex_featuredFairs.graphql"
import { FairsIndex_viewer } from "v2/__generated__/FairsIndex_viewer.graphql"
import { FairsFairBannerFragmentContainer } from "../Components/FairsFairBanner"
import { FairsFairRowFragmentContainer } from "../Components/FairsFairRow"
import { FairsPhonePromo } from "../Components/FairsPhonePromo"
import { FairsPromoCarousel } from "../Components/FairsPromoCarousel"
import { FairsMeta } from "../Components/FairsMeta"
import { FairsPastFairsPaginationContainer } from "../Components/FairsPastFairs"
import { mediator } from "lib/mediator"
import { useSystemContext } from "v2/System"

interface FairsIndexProps {
  featuredFairs: FairsIndex_featuredFairs
  viewer: FairsIndex_viewer
}

export const FairsIndex: React.FC<FairsIndexProps> = ({
  featuredFairs,
  viewer,
}) => {
  const { user } = useSystemContext()
  const isLoggedIn = Boolean(user)

  const [{ items: promoSlides }] = featuredFairs
  const { runningFairs, closedFairs } = viewer

  // @ts-expect-error STRICT_NULL_CHECK
  const upcomingFairs = viewer.upcomingFairs.filter(fair => {
    // @ts-expect-error STRICT_NULL_CHECK
    return fair.isPublished
  })

  const currentFairs = [
    // @ts-expect-error STRICT_NULL_CHECK
    ...runningFairs.filter(
      fair =>
        // @ts-expect-error STRICT_NULL_CHECK
        fair.isPublished &&
        // @ts-expect-error STRICT_NULL_CHECK
        fair.profile?.isPublished &&
        // @ts-expect-error STRICT_NULL_CHECK
        fair.bannerSize === "x-large"
    ),
    // @ts-expect-error STRICT_NULL_CHECK
    ...runningFairs.filter(
      fair =>
        // @ts-expect-error STRICT_NULL_CHECK
        fair.isPublished &&
        // @ts-expect-error STRICT_NULL_CHECK
        fair.profile?.isPublished &&
        // @ts-expect-error STRICT_NULL_CHECK
        fair.bannerSize !== "x-large"
    ),
  ]

  return (
    <>
      <FairsMeta />

      <Media lessThan="sm">
        <ResponsiveBox aspectWidth={16} aspectHeight={9} maxWidth="100%">
          <Text
            variant="largeTitle"
            color="white100"
            mx={-2}
            height="100%"
            backgroundImage="url('https://files.artsy.net/images/fairs-header-img.jpg')"
            backgroundSize="cover"
            backgroundPosition="center center"
          >
            <Box
              px={2}
              display="flex"
              alignItems="center"
              textAlign="center"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.25)"
            >
              Collect from leading art fairs on Artsy
            </Box>
          </Text>
        </ResponsiveBox>

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

        <Box my={3}>
          <Tabs>
            {currentFairs.length !== 0 && (
              <Tab name="Current">
                {currentFairs.map(fair => (
                  <FairsFairRowFragmentContainer
                    // @ts-expect-error STRICT_NULL_CHECK
                    key={fair.internalID}
                    // @ts-expect-error STRICT_NULL_CHECK
                    fair={fair}
                  />
                ))}
              </Tab>
            )}

            {upcomingFairs.length !== 0 && (
              <Tab name="Upcoming">
                {upcomingFairs.map(fair => (
                  <FairsFairRowFragmentContainer
                    // @ts-expect-error STRICT_NULL_CHECK
                    key={fair.internalID}
                    // @ts-expect-error STRICT_NULL_CHECK
                    fair={fair}
                  />
                ))}
              </Tab>
            )}

            {closedFairs?.length !== 0 && (
              <Tab name="Past">
                {closedFairs?.map(fair => (
                  <FairsFairRowFragmentContainer
                    // @ts-expect-error STRICT_NULL_CHECK
                    key={fair.internalID}
                    // @ts-expect-error STRICT_NULL_CHECK
                    fair={fair}
                  />
                ))}
              </Tab>
            )}
          </Tabs>
        </Box>
      </Media>

      <Media greaterThanOrEqual="sm">
        <Box my={3}>
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
                <Text variant="title" px={4} mb={2}>
                  {isLoggedIn
                    ? "Preview and collect from the world's leading art fairs"
                    : "Sign up to follow fairs and be the first to preview them on Artsy"}
                </Text>

                {!isLoggedIn && (
                  <Button
                    variant="secondaryOutline"
                    onClick={() => {
                      openAuthModal(mediator, {
                        mode: ModalType.signup,
                        intent: Intent.signup,
                        contextModule: ContextModule.fairsHeader,
                      })
                    }}
                  >
                    Sign up
                  </Button>
                )}
              </Column>

              <Column span={6}>
                <FairsPromoCarousel>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {promoSlides.map((slide, i) => {
                    return (
                      <ResponsiveBox
                        // @ts-expect-error STRICT_NULL_CHECK
                        key={slide.internalID}
                        aspectWidth={4}
                        aspectHeight={3}
                        maxWidth="100%"
                        width="100%"
                        bg="black10"
                      >
                        <Image
                          // @ts-expect-error STRICT_NULL_CHECK
                          src={slide.image.cropped.src}
                          // @ts-expect-error STRICT_NULL_CHECK
                          srcSet={slide.image.cropped.srcSet}
                          width="100%"
                          height="100%"
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
              <Text as="h1" variant="largeTitle" my={1}>
                Current Events
              </Text>

              <GridColumns my={1}>
                {currentFairs.map(fair => {
                  return (
                    <Column
                      // @ts-expect-error STRICT_NULL_CHECK
                      key={fair.internalID}
                      // @ts-expect-error STRICT_NULL_CHECK
                      span={fair.bannerSize === "x-large" ? 12 : 6}
                    >
                      {/* @ts-expect-error STRICT_NULL_CHECK */}
                      <FairsFairBannerFragmentContainer fair={fair} />
                    </Column>
                  )
                })}

                {
                  // Avoids orphaned CTA
                  // @ts-expect-error STRICT_NULL_CHECK
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

        <GridColumns my={3}>
          <Column span={7}>
            <Text
              as={currentFairs.length > 0 ? "h2" : "h1"}
              variant="title"
              pb={1}
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
              variant="title"
              pb={1}
              borderBottom="1px solid"
              borderColor="black10"
            >
              Upcoming Events
            </Text>

            {upcomingFairs.map(fair => {
              return (
                // @ts-expect-error STRICT_NULL_CHECK
                <Text key={fair.internalID} my={3}>
                  {/* @ts-expect-error STRICT_NULL_CHECK */}
                  {fair.organizer?.profile?.href ? (
                    // @ts-expect-error STRICT_NULL_CHECK
                    <RouterLink to={fair.organizer.profile.href}>
                      {/* @ts-expect-error STRICT_NULL_CHECK */}
                      {fair.name}
                    </RouterLink>
                  ) : (
                    // @ts-expect-error STRICT_NULL_CHECK
                    fair.name
                  )}

                  <Box>
                    {/* @ts-expect-error STRICT_NULL_CHECK */}
                    {fair.startAt} – {fair.endAt}
                  </Box>

                  {/* @ts-expect-error STRICT_NULL_CHECK */}
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
        startAt(format: "MMM Do")
        endAt(format: "MMM Do YYYY")
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
