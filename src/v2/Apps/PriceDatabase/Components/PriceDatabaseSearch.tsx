import {
  Button,
  Column,
  Flex,
  GridColumns,
  Text,
  MultiSelect,
} from "@artsy/palette"
import qs from "qs"
import React, { useState } from "react"
import { useAuctionResultsFilterContext } from "v2/Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { auctionHouseMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/AuctionHouseFilter"
import { categoryMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/MediumFilter"
import { sizeMap } from "v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter"
import { paramsToSnakeCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "v2/System/Router/useRouter"
import { filterSearchFilters } from "../Utils/filterSearchFilters"
import { PriceDatabaseArtistAutosuggest } from "./PriceDatabaseArtistAutosuggest"

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
  const [artistSlug, setArtistSlug] = useState<string | undefined>(undefined)

  const handleSearch = () => {
    const pathName = `/artist/${artistSlug}/auction-results`

    const searchFilters = filterSearchFilters(filters, ALLOWED_FILTERS)
    const queryString = qs.stringify(paramsToSnakeCase(searchFilters))

    // TODO: Add tracking for search

    const url = queryString ? `${pathName}?${queryString}` : pathName

    router.push(url)
  }

  const handleFilterSelect = key => {
    return selected => {
      setFilter?.(
        key,
        selected.map(selected => {
          return selected.value
        })
      )

      // TODO: Add tracking for filter changes
    }
  }

  return (
    <>
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={12}>
          <Text as="h1" variant="xl">
            Artsy Price Database
          </Text>
          <Text variant="sm" mb={[0, 2]}>
            Search auction results for more than 340,000 artists FOR FREE
          </Text>
        </Column>
      </GridColumns>
      <Flex
        alignItems="center"
        justifyContent="center"
        maxWidth="800px"
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
