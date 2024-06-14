import {
  Button,
  Column,
  GridColumns,
  MultiSelect,
  Spacer,
  Text,
} from "@artsy/palette"
import qs from "qs"
import { FC, useState } from "react"
import { useTracking } from "react-tracking"
import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { categoryMap } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/MediumFilter"
import { sizeMap } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter"
import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/urlBuilder"
import { useRouter } from "System/Hooks/useRouter"
import { filterSearchFilters } from "Apps/PriceDatabase/Utils/filterSearchFilters"
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

export const PriceDatabaseSearch: FC = () => {
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
      <GridColumns gridRowGap={[2, 0]}>
        <Column span={12}>
          <Text as="h1" variant={["xl", "xxl"]}>
            Artsy Price Database
          </Text>

          <Text variant={["sm-display", "lg-display"]}>
            Unlimited access to millions of auction results and art market
            data—for free.
          </Text>
        </Column>
      </GridColumns>

      <Spacer y={4} />

      <GridColumns gridRowGap={[2, 0]} width="100%" mx="auto">
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
            title="Medium"
          />
        </Column>

        <Column span={4} pb={[0, 4]}>
          <MultiSelect
            options={sizeOptions}
            title="Size"
            onSelect={handleFilterSelect("sizes")}
          />
        </Column>

        <Column span={4} start={5}>
          <Button disabled={!artistSlug} width="100%" onClick={handleSearch}>
            Search
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}
