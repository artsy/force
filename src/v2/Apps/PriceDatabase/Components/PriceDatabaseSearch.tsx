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
import { paramsToSnakeCase } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "v2/System/Router/useRouter"
import { filterSearchFilters } from "../Utils/filterSearchFilters"
import { ArtistAutosuggest } from "./ArtistAutosuggest"

const ALLOWED_FILTERS = ["categories", "sizes", "organizations"]

// TODO: Get all categories
const mediumOptions = [
  { text: "Painting", value: "Painting" },
  { text: "Work on paper", value: "Work on Paper" },
  { text: "Sculpture", value: "Sculpture" },
  { text: "Print", value: "Print" },
  { text: "Photography", value: "Photography" },
  { text: "Textile arts", value: "Textile Arts" },
]
const sizeOptions = [
  { text: "Small (under 40cm)", value: "SMALL" },
  { text: "Medium (40cm - 100cm)", value: "MEDIUM" },
  { text: "Large (over 100cm)", value: "LARGE" },
]
const organizationOptions = [
  { text: "Sotheby's", value: "Sotheby's" },
  { text: "Christie's", value: "Christie's" },
  { text: "Phillips", value: "Phillips" },
]

export const PriceDatabaseSearch: React.FC = () => {
  const { router } = useRouter()
  const { filters, setFilter } = useAuctionResultsFilterContext()
  const [artistSlug, setArtistSlug] = useState<string | undefined>(undefined)

  const handleSearch = () => {
    const pathName = `/artist/${artistSlug}/auction-results`

    const searchFilters = filterSearchFilters(filters, ALLOWED_FILTERS)
    const queryString = qs.stringify(paramsToSnakeCase(searchFilters))

    router.push(`${pathName}?${queryString}`)
  }

  const handleFilterSelect = key => selected => {
    setFilter?.(
      key,
      selected.map(selected => selected.value)
    )
  }

  return (
    <>
      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={12}>
          <Text as="h1" variant="xl">
            Artsy Price Database
          </Text>
          <Text lineHeight={1.5} mb={[0, 2]}>
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
            <ArtistAutosuggest onChange={artist => setArtistSlug(artist)} />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={mediumOptions}
              onSelect={handleFilterSelect("categories")}
              title={
                <Text display="inline" color="black60">
                  Medium
                </Text>
              }
            />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={sizeOptions}
              title={
                <Text display="inline" color="black60">
                  Size
                </Text>
              }
              onSelect={handleFilterSelect("sizes")}
            />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={organizationOptions}
              title={
                <Text color="black60" display="inline">
                  Auction Houses
                </Text>
              }
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
