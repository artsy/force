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
import { ArtistAutosuggest } from "./ArtistAutosuggest"

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
const timePeriodOptions = Array.from({ length: 20 }, (_, i) => {
  const createdAfterYear = 2010 - 10 * i

  return {
    text: `${createdAfterYear}s`,
    value: `${createdAfterYear}`,
  }
})

export const PriceDatabaseSearch: React.FC = () => {
  const { router } = useRouter()

  const { filters, setFilter } = useAuctionResultsFilterContext()

  const [artistSlug, setArtistSlug] = useState<string | undefined>(undefined)

  const handleSearch = () => {
    const pathName = `/artist/${artistSlug}/auction-results`
    const queryString = qs.stringify(paramsToSnakeCase(filters))

    router.push(`${pathName}?${queryString}`)
  }

  const handleMediumSelect = categories => {
    setFilter?.(
      "categories",
      categories.map(category => category.value)
    )
  }

  const handleSizeSelect = sizes => {
    setFilter?.(
      "sizes",
      sizes.map(size => size.value)
    )
  }

  const handleTimePeriodSelect = selected => {
    const values = selected.map(size => size.value)

    setFilter?.("createdAfterYear", +values.sort()[0])
    setFilter?.("createdBeforeYear", +values.sort().slice(-1)[0] + 9)
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
              onSelect={handleMediumSelect}
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
              onSelect={handleSizeSelect}
            />
          </Column>
          <Column span={4} pb={[0, 4]}>
            <MultiSelect
              options={timePeriodOptions}
              title={
                <Text color="black60" display="inline">
                  Time Period
                </Text>
              }
              onSelect={handleTimePeriodSelect}
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
