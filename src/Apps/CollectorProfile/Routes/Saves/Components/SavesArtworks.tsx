import { Box, Dropdown, Pill, Select, Stack } from "@artsy/palette"
import {
  SavesArtworksGrid,
  SavesArtworksGridEmptyState,
  SavesArtworksGridPlaceholder,
} from "Apps/CollectorProfile/Routes/Saves/Components/SavesArtworksGrid"
import { FilterQuickDropdownAnchor } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { ClientSuspense } from "Components/ClientSuspense"
import { PriceRange } from "Components/PriceRange/PriceRange"
import { priceRangeToLabel } from "Components/PriceRange/Utils/priceRangeToLabel"
import type { CustomRangeSegment } from "Components/PriceRange/constants"
import {
  type ErrorFallbackProps,
  FallbackErrorBoundary,
} from "System/Components/FallbackErrorBoundary"
import { Jump } from "Utils/Hooks/useJump"
import type { CollectionArtworkSorts } from "__generated__/SavesArtworksGridQuery.graphql"
import { type FC, useMemo, useState } from "react"

export const SAVES_ARTWORKS_SECTION_ID = "SavesArtworks"

interface SavesArtworksProps {
  id: string
}

export const DEFAULT_FILTERS: {
  page: number
  priceMin: CustomRangeSegment
  priceMax: CustomRangeSegment
} = {
  page: 1,
  priceMax: "*",
  priceMin: "*",
}

export const SavesArtworks: FC<React.PropsWithChildren<SavesArtworksProps>> = ({
  id,
}) => {
  const [state, setState] = useState<{
    page: number
    priceMin: CustomRangeSegment
    priceMax: CustomRangeSegment
    sort: CollectionArtworkSorts
  }>({
    ...DEFAULT_FILTERS,
    sort: "SAVED_AT_DESC",
  })

  const dropdown = useMemo(() => {
    return (
      <Box p={2} maxHeight={230} width={300}>
        <PriceRange
          priceRange={`${state.priceMin}-${state.priceMax}`}
          onDebouncedUpdate={range => {
            setState(prevState => ({
              ...prevState,
              page: 1,
              priceMin: range[0],
              priceMax: range[1],
            }))
          }}
        />
      </Box>
    )
  }, [state.priceMax, state.priceMin])

  const SaveArtworksInvalidFallback = useMemo(() => {
    return ({ onReset }: ErrorFallbackProps) => {
      return (
        <SavesArtworksGridEmptyState
          onClearFilters={() => {
            onReset()
            handleClearFilters()
          }}
        />
      )
    }
  }, [])

  const handleClearFilters = () => {
    setState(prevState => ({ ...prevState, ...DEFAULT_FILTERS }))
  }

  return (
    <>
      <Jump id={SAVES_ARTWORKS_SECTION_ID} />

      <Stack gap={2}>
        <Stack
          gap={2}
          flexDirection="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Stack gap={2} flexDirection="row">
            <Dropdown
              dropdown={dropdown}
              openDropdownByClick
              placement="bottom-start"
            >
              {props => {
                return (
                  <FilterQuickDropdownAnchor
                    label="Price Range"
                    count={0}
                    {...props}
                  />
                )
              }}
            </Dropdown>

            {!(state.priceMin === "*" && state.priceMax === "*") && (
              <Pill
                variant="gray"
                selected
                onClick={() => {
                  setState(prevState => ({
                    ...prevState,
                    page: 1,
                    priceMin: "*",
                    priceMax: "*",
                  }))
                }}
              >
                {priceRangeToLabel(`${state.priceMin}-${state.priceMax}`)}
              </Pill>
            )}
          </Stack>

          <Select
            width="fit-content"
            options={[
              { value: "SAVED_AT_DESC", text: "Recently saved" },
              { value: "SAVED_AT_ASC", text: "First added" },
            ]}
            onSelect={sort => {
              setState(prevState => ({
                ...prevState,
                sort: sort as CollectionArtworkSorts,
              }))
            }}
          />
        </Stack>

        <FallbackErrorBoundary FallbackComponent={SaveArtworksInvalidFallback}>
          <ClientSuspense fallback={<SavesArtworksGridPlaceholder />}>
            <SavesArtworksGrid
              id={id}
              {...state}
              onClearFilters={handleClearFilters}
              onPage={page => {
                setState(prevState => ({ ...prevState, page }))
              }}
            />
          </ClientSuspense>
        </FallbackErrorBoundary>
      </Stack>
    </>
  )
}
