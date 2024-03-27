import FilterIcon from "@artsy/icons/FilterIcon"
import AddIcon from "@artsy/icons/AddIcon"
import { AutocompleteInput, Button, Stack } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { FC } from "react"
import { CollectorProfileArtistsList } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsList"

interface CollectorProfileArtistsRouteProps {}

export const CollectorProfileArtistsRoute: FC<CollectorProfileArtistsRouteProps> = props => {
  return (
    <>
      <MetaTags
        title="Artists | Collector Profile | Artsy"
        pathname="collector-profile/artists"
      />

      <Stack gap={6}>
        <Stack gap={2} flexDirection="row" alignItems="center">
          <AutocompleteInput
            placeholder="Search artists in your collection"
            options={[]}
            flex={1}
          />

          <Button variant="tertiary" Icon={FilterIcon} size="small">
            Sort & Filter
          </Button>

          <Button variant="primaryBlack" Icon={AddIcon}>
            Add Artist
          </Button>
        </Stack>

        <CollectorProfileArtistsList />
      </Stack>
    </>
  )
}
