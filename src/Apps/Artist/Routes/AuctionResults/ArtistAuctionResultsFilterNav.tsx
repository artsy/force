import { ContextModule } from "@artsy/cohesion"
import ChevronSmallDownIcon from "@artsy/icons/ChevronSmallDownIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import {
  Box,
  Clickable,
  Flex,
  FullBleed,
  HorizontalOverflow,
  Pill,
  Stack,
  Text,
} from "@artsy/palette"
import { ArtistAuctionResultsFilters } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsFilters"
import { ArtistAuctionResultsSortSelect } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsSortSelect"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Sticky } from "Components/Sticky"
import { Media } from "Utils/Responsive"
import type { FC } from "react"

interface ArtistAuctionResultsFilterNavProps {
  showUpcomingAuctionResults: boolean
  onMobileFilterClick: () => void
  children: React.ReactNode
}

export const ArtistAuctionResultsFilterNav: FC<
  ArtistAuctionResultsFilterNavProps
> = ({ showUpcomingAuctionResults, onMobileFilterClick, children }) => {
  return (
    <ArtistAuctionResultsFilterNavBar
      mobile={
        <>
          <Clickable
            onClick={onMobileFilterClick}
            display="flex"
            alignItems="center"
            gap={0.5}
            p={2}
          >
            <FilterIcon />

            <Text variant="xs">Sort & Filter</Text>
          </Clickable>
        </>
      }
      desktop={
        <>
          <ArtistAuctionResultsFilters
            showUpcomingAuctionResults={showUpcomingAuctionResults}
          />

          <ArtistAuctionResultsSortSelect />
        </>
      }
    >
      {children}
    </ArtistAuctionResultsFilterNavBar>
  )
}

export const ArtistAuctionResultsFilterNavPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  return (
    <ArtistAuctionResultsFilterNavBar
      mobile={
        <Box display="flex" alignItems="center" gap={0.5} p={2}>
          <FilterIcon />

          <Text variant="xs">Sort & Filter</Text>
        </Box>
      }
      desktop={
        <>
          <HorizontalOverflow minWidth={0}>
            <Stack gap={2} flexDirection="row">
              <Pill size="small" disabled Icon={FilterIcon}>
                All Filters
              </Pill>

              <Box bg="mono30" width="1px" flexShrink={0} />

              <Stack gap={1} flexDirection="row">
                <Pill
                  size="small"
                  Icon={ChevronSmallDownIcon}
                  iconPosition="right"
                  disabled
                >
                  Medium
                </Pill>

                <Pill
                  size="small"
                  Icon={ChevronSmallDownIcon}
                  iconPosition="right"
                  disabled
                >
                  Price Range
                </Pill>

                <Pill
                  size="small"
                  Icon={ChevronSmallDownIcon}
                  iconPosition="right"
                  disabled
                >
                  Year
                </Pill>
              </Stack>
            </Stack>
          </HorizontalOverflow>

          <ArtistAuctionResultsSortSelect disabled />
        </>
      }
    >
      {children}
    </ArtistAuctionResultsFilterNavBar>
  )
}

interface ArtistAuctionResultsFilterNavBarProps {
  children: React.ReactNode
  mobile: React.ReactNode
  desktop: React.ReactNode
}

const ArtistAuctionResultsFilterNavBar: FC<
  React.PropsWithChildren<ArtistAuctionResultsFilterNavBarProps>
> = ({ children, mobile, desktop }) => {
  return (
    <Box
      id="Sticky__ArtistAuctionResultsFilter"
      data-test={ContextModule.auctionResults}
    >
      <Media at="xs">
        <Sticky bottomBoundary="#Sticky__ArtistAuctionResultsFilter">
          <FullBleed
            backgroundColor="mono0"
            borderBottom="1px solid"
            borderColor="mono10"
          >
            <Flex justifyContent="flex-end" alignItems="center" width="100%">
              {mobile}
            </Flex>
          </FullBleed>
        </Sticky>
      </Media>

      <Media greaterThan="xs">
        <Sticky bottomBoundary="#Sticky__ArtistAuctionResultsFilter">
          <FullBleed backgroundColor="mono0">
            <AppContainer>
              <HorizontalPadding>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  py={1}
                  bg="mono0"
                >
                  {desktop}
                </Flex>
              </HorizontalPadding>
            </AppContainer>
          </FullBleed>
        </Sticky>
      </Media>

      {children}
    </Box>
  )
}
