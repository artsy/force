import {
  Button,
  Column,
  Flex,
  GridColumns,
  MultiSelect,
  Text,
} from "@artsy/palette"
import qs from "qs"
import { useState } from "react";
import * as React from "react";
import { useTracking } from "react-tracking"
import { useAuctionResultsFilterContext } from "v2/Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { categoryMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/MediumFilter"
import { sizeMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter"
import { paramsToSnakeCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "v2/System/Router/useRouter"
import { Media } from "v2/Utils/Responsive"
import { filterSearchFilters } from "../Utils/filterSearchFilters"
import { PriceDatabaseArtistAutosuggest } from "./PriceDatabaseArtistAutosuggest"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"

const ALLOWED_FILTERS = ["categories", "sizes"]

const mapMapToOptions = map => {
  return map.map(element => {
    return { text: element.displayName, value: element.name }
  })
}

const categoryOptions = mapMapToOptions(categoryMap)
const sizeOptions = mapMapToOptions(sizeMap)

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
          <Text as="h1" variant={["xl", "xxl"]}>
            <Media lessThan="sm">
              Artsy
              <br />
              Price Database
            </Media>
            <Media greaterThanOrEqual="sm">Artsy Price Database</Media>
          </Text>
          <Text variant={["sm", "lg"]} mb={[0, 2]}>
            Unlimited access to auction results and art market data—for free.
            <br />
            Browse millions of auction records from over 900 top auction houses,
            from 1986 to today.
          </Text>
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
          <Column span={4} start={3} pb={[0, 4]}>
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
