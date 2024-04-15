import AddIcon from "@artsy/icons/AddIcon"
import { AutocompleteInput, Button, Stack } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { FC, useState } from "react"
import { CollectorProfileArtistsList } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsList"
import { CollectorProfileArtistsAddDialog } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsAddDialog"

interface CollectorProfileArtistsRouteProps {}

export const CollectorProfileArtistsRoute: FC<CollectorProfileArtistsRouteProps> = props => {
  const [mode, setMode] = useState<"Idle" | "Add">("Idle")

  const handleClose = () => {
    setMode("Idle")
  }

  const handleAdd = () => {
    setMode("Add")
  }

  return (
    <>
      <MetaTags
        title="Artists | Collector Profile | Artsy"
        pathname="collector-profile/artists"
      />

      <Stack gap={[4, 6]}>
        <Stack
          gap={[1, 2]}
          flexDirection={["column", "row"]}
          alignItems={["flex-start", "center"]}
        >
          <AutocompleteInput
            placeholder="Search artists in your collection"
            options={[]}
            flex={1}
            width="100%"
          />

          <Button variant="primaryBlack" Icon={AddIcon} onClick={handleAdd}>
            Add Artist
          </Button>
        </Stack>

        <CollectorProfileArtistsList />
      </Stack>

      {mode === "Add" && (
        <CollectorProfileArtistsAddDialog onClose={handleClose} />
      )}
    </>
  )
}
