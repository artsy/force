import { CollectorProfileArtistsList } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsList"
import { CollectorProfileArtistsListHeader } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsListHeader"
import { CollectorProfileArtistsSearchResults } from "Apps/CollectorProfile/Components/CollectorProfileArtists/CollectorProfileArtistsSearchResults"
import { CollectorProfileArtistsAddDialog } from "Components/CollectorProfile/CollectorProfileArtistsAddDialog"
import { MetaTags } from "Components/MetaTags"
import { useRouter } from "System/Hooks/useRouter"
import AddIcon from "@artsy/icons/AddIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, Button, Clickable, LabeledInput, Stack } from "@artsy/palette"
import { type FC, useRef, useState } from "react"

type CollectorProfileArtistsRouteProps = {}

export const CollectorProfileArtistsRoute: FC<
  React.PropsWithChildren<CollectorProfileArtistsRouteProps>
> = () => {
  const { router } = useRouter()

  const [mode, setMode] = useState<"Idle" | "Add">("Idle")
  const [term, setTerm] = useState("")

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleClose = () => {
    setMode("Idle")
  }

  const handleAdd = () => {
    setMode("Add")
  }

  const handleClear = () => {
    setTerm("")
    inputRef.current?.focus()
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
          <LabeledInput
            ref={inputRef}
            placeholder="Search artists in My Collection"
            label={
              term ? (
                <Clickable
                  onClick={handleClear}
                  height="100%"
                  display="flex"
                  alignItems="center"
                  aria-label="Clear input"
                >
                  <CloseIcon fill="mono60" aria-hidden />
                </Clickable>
              ) : (
                <SearchIcon fill="mono60" aria-hidden />
              )
            }
            value={term}
            width="100%"
            onChange={({ currentTarget: { value } }) => {
              setTerm(value)
            }}
          />

          <Button variant="primaryBlack" Icon={AddIcon} onClick={handleAdd}>
            Add Artist
          </Button>
        </Stack>

        <Box>
          <CollectorProfileArtistsListHeader />

          {term.length > 0 ? (
            <CollectorProfileArtistsSearchResults term={term} />
          ) : (
            <CollectorProfileArtistsList />
          )}
        </Box>
      </Stack>

      {mode === "Add" && (
        <CollectorProfileArtistsAddDialog
          title="Select an artist"
          onClose={handleClose}
          onSuccess={() => {
            router.push({
              pathname: "/collector-profile/artists",
              query: { page: 1 },
            })
          }}
        />
      )}
    </>
  )
}
