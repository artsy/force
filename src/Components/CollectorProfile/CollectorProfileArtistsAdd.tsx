import CloseIcon from "@artsy/icons/CloseIcon"
import SearchIcon from "@artsy/icons/SearchIcon"
import {
  Box,
  Button,
  Clickable,
  LabeledInput,
  Message,
  Spinner,
  Stack,
  Text,
  useToasts,
} from "@artsy/palette"
import { CollectorProfileArtistsAddNewDialog } from "Components/CollectorProfile/CollectorProfileArtistsAddNewDialog"
import { CollectorProfileArtistsAddResult } from "Components/CollectorProfile/CollectorProfileArtistsAddResult"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useMutation } from "Utils/Hooks/useMutation"
import { extractNodes } from "Utils/extractNodes"
import type {
  CollectorProfileArtistsAddCreateUserInterestsMutation,
  UserInterestCategory,
  UserInterestInterestType,
} from "__generated__/CollectorProfileArtistsAddCreateUserInterestsMutation.graphql"
import type { CollectorProfileArtistsAddQuery } from "__generated__/CollectorProfileArtistsAddQuery.graphql"
import { useRouter } from "found"
import { type FC, useRef, useState } from "react"
import { type Environment, graphql } from "react-relay"

interface CollectorProfileArtistsAddProps {
  description?: string
  onSuccess: () => void
  onCancel?: () => void
  /* When used in the inquiry flow we may have to inject a newly authenticated environment */
  relayEnvironment?: Environment | null
}

export const CollectorProfileArtistsAdd: FC<
  React.PropsWithChildren<CollectorProfileArtistsAddProps>
> = ({ description, onCancel, onSuccess, relayEnvironment }) => {
  const { router } = useRouter()

  const [query, setQuery] = useState("")

  const { debouncedValue: debouncedQuery } = useDebouncedValue({
    value: query,
    delay: 250,
  })

  const { data, loading } = useClientQuery<CollectorProfileArtistsAddQuery>({
    query: QUERY,
    variables: { query: debouncedQuery },
    skip: debouncedQuery.length === 0,
  })

  const artists = extractNodes(data?.matchConnection)

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [selected, setSelected] = useState<string[]>([])

  const { sendToast } = useToasts()

  const [mode, setMode] = useState<"Idle" | "Adding" | "New">("Idle")

  const { submitMutation } =
    useMutation<CollectorProfileArtistsAddCreateUserInterestsMutation>({
      mutation: MUTATION,
      relayEnvironment,
    })

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment ?? undefined,
  })

  const handleAdd = async () => {
    setMode("Adding")

    try {
      const userInterests = selected.map(interestId => {
        return {
          category: "COLLECTED_BEFORE" as UserInterestCategory,
          interestId,
          interestType: "ARTIST" as UserInterestInterestType,
        }
      })

      await submitMutation({ variables: { input: { userInterests } } })

      router.push({
        pathname: "/collector-profile/artists",
        query: { page: 1 },
      })

      sendToast({
        variant: "success",
        message: `Added artist${
          selected.length === 1 ? "" : "s"
        } to your collection.`,
      })

      onSuccess?.()
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })
    }

    setMode("Idle")
  }

  const handleCancel = async () => {
    try {
      await submitUpdateMyUserProfile({ promptedForUpdate: true })
    } catch (err) {
      console.error(err)
    }

    onCancel?.()
  }

  return (
    <>
      <Stack gap={2} height="100%">
        {description && (
          <Text variant="sm-display" color="mono60">
            {description}
          </Text>
        )}

        <LabeledInput
          ref={inputRef}
          placeholder="Search for artists on Artsy"
          label={
            loading ? (
              <Box width={18}>
                <Spinner size="small" />
              </Box>
            ) : query ? (
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
          value={query}
          onChange={event => {
            setQuery(event.currentTarget.value)
          }}
        />

        <Stack gap={0.5}>
          {query.length > 0 && (
            <Text variant="xs" color="mono60">
              Can’t find the artist?{" "}
              <Clickable
                textDecoration="underline"
                onClick={() => {
                  setMode("New")
                }}
              >
                Add their name.
              </Clickable>
            </Text>
          )}

          <Text variant="xs">
            {selected.length} artist{selected.length === 1 ? "" : "s"} selected
          </Text>
        </Stack>

        {debouncedQuery.length === 0 && (
          <Message>
            Select an artist to add them to your collection.
            <br />
            Results will appear here as you search.
          </Message>
        )}

        {!loading && debouncedQuery.length > 0 && artists.length === 0 && (
          <Message>No results found for {debouncedQuery}</Message>
        )}

        <Stack gap={2} flex={1} overflowY="auto">
          {artists.map(artist => {
            return (
              <CollectorProfileArtistsAddResult
                key={artist.internalID}
                artist={artist}
                selected={selected.includes(String(artist.internalID))}
                onSelect={isSelected => {
                  setSelected(prevSelected => {
                    if (isSelected) {
                      return [...prevSelected, String(artist.internalID)]
                    }

                    return prevSelected.filter(
                      id => id !== String(artist.internalID),
                    )
                  })
                }}
              />
            )
          })}

          {loading && (
            <>
              {new Array(7).fill(null).map((_, index) => (
                <EntityHeaderPlaceholder key={index} />
              ))}
            </>
          )}
        </Stack>

        <Stack gap={1}>
          <Button
            disabled={selected.length === 0 || mode === "Adding"}
            width="100%"
            onClick={handleAdd}
          >
            Add{mode === "Adding" ? "ing" : ""} selected artist
            {selected.length === 1 ? "" : "s"}
            {selected.length > 0 && <> • {selected.length}</>}
          </Button>

          {onCancel && (
            <Button variant="tertiary" onClick={handleCancel}>
              I haven't started a collection yet
            </Button>
          )}
        </Stack>
      </Stack>

      {mode === "New" && (
        <CollectorProfileArtistsAddNewDialog
          name={query}
          onClose={() => {
            setMode("Idle")
          }}
          onAdd={artistId => {
            setSelected(prevSelected => {
              return [...prevSelected, artistId]
            })
          }}
        />
      )}
    </>
  )
}

const QUERY = graphql`
  query CollectorProfileArtistsAddQuery($query: String!) {
    matchConnection(
      term: $query
      entities: ARTIST
      mode: AUTOSUGGEST
      first: 7
    ) {
      edges {
        node {
          ...CollectorProfileArtistsAddResult_artist
          ... on Artist {
            internalID
          }
        }
      }
    }
  }
`

const MUTATION = graphql`
  mutation CollectorProfileArtistsAddCreateUserInterestsMutation(
    $input: CreateUserInterestsMutationInput!
  ) {
    createUserInterests(input: $input) {
      me {
        ...CollectorProfileArtistsList_me @arguments(page: 1, size: 10)
      }
    }
  }
`
