import {
  Button,
  Column,
  Flex,
  GridColumns,
  MultiSelect,
  Text,
} from "@artsy/palette"
import qs from "qs"
import React, { useState } from "react"
import { useTracking } from "react-tracking"
import { useAuctionResultsFilterContext } from "v2/Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { auctionHouseMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/AuctionHouseFilter"
import { categoryMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/MediumFilter"
import { sizeMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter"
import { paramsToSnakeCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "v2/System/Router/useRouter"
import { Media } from "v2/Utils/Responsive"
import { filterSearchFilters } from "../Utils/filterSearchFilters"
import { PriceDatabaseArtistAutosuggest } from "./PriceDatabaseArtistAutosuggest"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"

const ALLOWED_FILTERS = ["categories", "sizes", "organizations"]

const mapMapToOptions = map => {
  return map.map(element => {
    return { text: element.displayName, value: element.name }
  })
}

const categoryOptions = mapMapToOptions(categoryMap)
const sizeOptions = mapMapToOptions(sizeMap)
const organizationOptions = mapMapToOptions(auctionHouseMap)

export const PriceDatabaseSearch: React.FC = () => {
  const { router } = useRouter()
  const { filters, setFilter } = useAuctionResultsFilterContext()
  const { trackEvent } = useTracking()
  const [artistSlug, setArtistSlug] = useState<string | undefined>(undefined)

  const handleSearch = () => {
    const pathName = `/artist/${artistSlug}/auction-results`
    const searchFilters = filterSearchFilters(filters, ALLOWED_FILTERS)
    const queryString = qs.stringify(paramsToSnakeCase(searchFilters))
    const paramFlag = "scroll_to_market_signals=true"

    trackEvent({
      action: ActionType.searchedPriceDatabase,
      context_module: ContextModule.priceDatabaseLanding,
      context_owner_type: OwnerType.priceDatabase,
      destination_owner_type: OwnerType.artistAuctionResults,
      destination_owner_slug: artistSlug,
      destination_path: pathName,
      filters: JSON.stringify(searchFilters),
      query: queryString,
    })

    const url = queryString
      ? `${pathName}?${queryString}&${paramFlag}`
      : `${pathName}?${paramFlag}`

    router.push(url)
  }

  const handleFilterSelect = key => {
    return selected => {
      setFilter?.(
        key,
        selected.map(selected => {
          trackEvent({
            action_type: ActionType.priceDatabaseFilterParamsChanged,
            context_module: ContextModule.priceDatabaseLanding,
            context_owner_type: OwnerType.priceDatabase,
            changed: `{${key}: ${selected.value}}`,
            current: JSON.stringify(
              filterSearchFilters(filters, ALLOWED_FILTERS)
            ),
          })

          return selected.value
        })
      )
    }
  }

  return (
    <>
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={12}>
          <Media lessThan="md">
            <Text as="h1" variant="xl">
              Artsy Price
              <br />
              Database
            </Text>
            <Text variant="sm" mb={[0, 2]}>
              Unlimited access to auction results and art market data—for free.
              <br />
              Browse 6.5 million auction records from 2,400 top auction houses,
              from 1986 to today.
            </Text>
          </Media>
          <Media greaterThanOrEqual="md">
            <Text as="h1" variant="xxl">
              Artsy Price Database
            </Text>
            <Text variant="lg" mb={[0, 2]}>
              Unlimited access to auction results and art market data—for free.
              <br />
              Browse 6.5 million auction records from 2,400 top auction houses,
              from 1986 to today.
            </Text>
          </Media>
        </Column>
      </GridColumns>
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        mx="auto"
        flexDirection="column"
        pb={[0, 4]}
      >
        <GridColumns pb={[4, 0]} gridRowGap={[2, 0]} width="100%" mx="auto">
          <Column span={12} pb={[0, 4]}>
            <PriceDatabaseArtistAutosuggest
              onChange={artist => {
                return setArtistSlug(artist)
              }}
            />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={categoryOptions}
              onSelect={handleFilterSelect("categories")}
              name="Medium"
            />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={sizeOptions}
              name="Size"
              onSelect={handleFilterSelect("sizes")}
            />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={organizationOptions}
              name="Auction Houses"
              onSelect={handleFilterSelect("organizations")}
            />
          </Column>
        </GridColumns>
        <Button
          disabled={!artistSlug}
          width="100%"
          maxWidth="440px"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Flex>
    </>
  )
}
