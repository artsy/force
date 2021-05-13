import { Box, ChevronIcon, Col, Flex, Row, Sans, Spacer } from "@artsy/palette"
import { ArtistApp_artist } from "v2/__generated__/ArtistApp_artist.graphql"
import { ArtistMetaFragmentContainer as ArtistMeta } from "v2/Apps/Artist/Components/ArtistMeta"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Artist/Components/NavigationTabs"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { useTracking } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { findCurrentRoute } from "v2/Artsy/Router/Utils/findCurrentRoute"
import { RecentlyViewedQueryRenderer as RecentlyViewed } from "v2/Components/RecentlyViewed"
import { Match } from "found"
import React from "react"
import { LazyLoadComponent } from "react-lazy-load-image-component"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistHeaderFragmentContainer as ArtistHeader } from "./Components/ArtistHeader"
import { StyledLink } from "./Components/StyledLink"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"

export interface ArtistAppProps {
  artist: ArtistApp_artist
  params: {
    artistID: string
  }
  match: Match
}

export const ArtistApp: React.FC<ArtistAppProps> = props => {
  const { artist, children } = props
  const { trackEvent } = useTracking()
  const route = findCurrentRoute(props.match)
  let HorizontalPaddingArea:
    | typeof HorizontalPadding
    | typeof Box = HorizontalPadding

  // @ts-expect-error STRICT_NULL_CHECK
  if (route.displayFullPage) {
    HorizontalPaddingArea = Box
  }

  return (
    <>
      <ArtistMeta artist={artist} />
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {route.displayNavigationTabs && (
        <Row>
          <Col>
            <ArtistHeader artist={artist} />
          </Col>
        </Row>
      )}

      <HorizontalPaddingArea>
        <Row>
          <Col>
            {/*
              Page with tabs
             */}
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            {route.displayNavigationTabs ? (
              <>
                <Spacer mb={3} />
                <NavigationTabs artist={artist} />
                <Spacer mb={2} />
              </>
            ) : (
              /**
               * If full page, then we take over the entire area; if not, then
               * display the "Back to Artist link"
               */
              // @ts-expect-error STRICT_NULL_CHECK
              !route.displayFullPage && (
                <>
                  <Flex flexDirection="row" alignItems="center" my={3}>
                    <ChevronIcon
                      direction="left"
                      color="black"
                      height="18px"
                      width="14px"
                      top="-1px"
                    />
                    <Sans size="3" weight="medium" color="black100" ml="3px">
                      <StyledLink
                        to={`/artist/${artist.slug}`}
                        onClick={() =>
                          trackEvent({
                            action_type: Schema.ActionType.Click,
                            destination_path: `/artist/${artist.slug}`,
                            subject: "Back to artist link",
                          })
                        }
                      >
                        {`Back to ${artist.name}`}
                      </StyledLink>
                    </Sans>
                  </Flex>
                  <Spacer mb={2} />
                </>
              )
            )}
            {children}
          </Col>
        </Row>

        {/* Fullpage is typically a stand-alone marketing page  */}
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {!route.displayFullPage && typeof window !== "undefined" && (
          <>
            <LazyLoadComponent threshold={1000}>
              <Row>
                <Col>
                  <RecentlyViewed />
                </Col>
              </Row>
            </LazyLoadComponent>
          </>
        )}
      </HorizontalPaddingArea>
    </>
  )
}

const TrackingWrappedArtistApp: React.FC<ArtistAppProps> = props => {
  const {
    artist: { internalID },
  } = props
  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()
  // FIXME: old schema to be deprecated - new events use AnalyticsContext
  const Component = track<ArtistAppProps>(_p => ({
    context_page: Schema.PageName.ArtistPage,
    context_page_owner_id: internalID,
    context_page_owner_slug: contextPageOwnerSlug,
    context_page_owner_type: Schema.OwnerType.Artist,
  }))(ArtistApp)

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <Component {...props} />
    </AnalyticsContext.Provider>
  )
}

export const ArtistAppFragmentContainer = createFragmentContainer(
  TrackingWrappedArtistApp,
  {
    artist: graphql`
      fragment ArtistApp_artist on Artist {
        internalID
        name
        slug
        ...ArtistMeta_artist
        ...ArtistHeader_artist
        ...NavigationTabs_artist
      }
    `,
  }
)
