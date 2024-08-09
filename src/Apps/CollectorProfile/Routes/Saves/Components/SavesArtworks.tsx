import { Box, Dropdown, Pill, Select, Stack } from "@artsy/palette"
import { FC, useMemo, useState } from "react"
import { CustomRangeSegment } from "Components/PriceRange/constants"
import { PriceRange } from "Components/PriceRange/PriceRange"
import {
  SavesArtworksGrid,
  SavesArtworksGridPlaceholder,
} from "Apps/CollectorProfile/Routes/Saves/Components/SavesArtworksGrid"
import { ClientSuspense } from "Components/ClientSuspense"
import { FilterQuickDropdownAnchor } from "Components/ArtworkFilter/ArtworkFiltersQuick/FilterQuick"
import { priceRangeToLabel } from "Components/PriceRange/Utils/parsePriceRange"
import { Jump } from "Utils/Hooks/useJump"
import { CollectionArtworkSorts } from "__generated__/SavesArtworksGridQuery.graphql"

interface SavesArtworksProps {
  id: string
}

export const SavesArtworks: FC<SavesArtworksProps> = ({ id }) => {
  const [state, setState] = useState<{
    page: number
    priceMin: CustomRangeSegment
    priceMax: CustomRangeSegment
    sort: CollectionArtworkSorts
  }>({
    page: 1,
    priceMax: "*",
    priceMin: "*",
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

  return (
    <>
      <Jump id="SavesArtworks" />

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

        <ClientSuspense fallback={<SavesArtworksGridPlaceholder />}>
          <SavesArtworksGrid
            id={id}
            {...state}
            onPage={page => {
              setState(prevState => ({ ...prevState, page }))
            }}
          />
        </ClientSuspense>
      </Stack>
    </>
  )
}
