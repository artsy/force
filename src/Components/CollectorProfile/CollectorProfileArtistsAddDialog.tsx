import SearchIcon from "@artsy/icons/SearchIcon"
import {
  Box,
  Button,
  Clickable,
  LabeledInput,
  Message,
  ModalDialog,
  Spinner,
  Stack,
  Text,
  useToasts,
} from "@artsy/palette"
import { FC, useRef, useState } from "react"
import { graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { CollectorProfileArtistsAddDialogQuery } from "__generated__/CollectorProfileArtistsAddDialogQuery.graphql"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import CloseIcon from "@artsy/icons/CloseIcon"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  CollectorProfileArtistsAddDialogCreateUserInterestsMutation,
  UserInterestCategory,
  UserInterestInterestType,
} from "__generated__/CollectorProfileArtistsAddDialogCreateUserInterestsMutation.graphql"
import { CollectorProfileArtistsAddResult } from "Components/CollectorProfile/CollectorProfileArtistsAddResult"
import { CollectorProfileArtistsAddNewDialog } from "Components/CollectorProfile/CollectorProfileArtistsAddNewDialog"

interface CollectorProfileArtistsAddDialogProps {
  description?: string
  isCancellable?: boolean
  onClose: () => void
  onSuccess?: () => void
  title: string
}

export const CollectorProfileArtistsAddDialog: FC<CollectorProfileArtistsAddDialogProps> = ({
  description,
  isCancellable = false,
  onClose,
  onSuccess,
  title,
}) => {
  const [query, setQuery] = useState("")

  const { debouncedValue: debouncedQuery } = useDebouncedValue({
    value: query,
    delay: 250,
  })

  const { data, loading } = useClientQuery<
    CollectorProfileArtistsAddDialogQuery
  >({
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

  const { submitMutation } = useMutation<
    CollectorProfileArtistsAddDialogCreateUserInterestsMutation
  >({ mutation: MUTATION })

  const handleAdd = async () => {
    setMode("Adding")

    try {
      const userInterests = selected.map(interestId => {
        return {
          category: "COLLECTED_BEFORE" as UserInterestCategory,
          interestId,
          interestType: "ARTIST" as UserInterestInterestType,
          private: true,
        }
      })

      await submitMutation({ variables: { input: { userInterests } } })

      sendToast({
        variant: "success",
        message: `Added artist${
          selected.length === 1 ? "" : "s"
        } to your collection.`,
      })

      onSuccess?.()
      onClose()
    } catch (err) {
      console.error(err)

      sendToast({ variant: "error", message: err.message })
    }

    setMode("Idle")
  }

  return (
    <>
      <ModalDialog
        title={title}
        onClose={onClose}
        dialogProps={{ height: 700, width: 650 }}
        footer={
          <Stack gap={1}>
            <Button
              disabled={selected.length === 0 || mode === "Adding"}
              width="100%"
              onClick={handleAdd}
            >
              Add{mode === "Adding" ? "ing" : ""} selected artist
              {selected.length === 1 ? "" : "s"}
              {selected.length > 0 && <>• {selected.length}</>}
            </Button>

            {isCancellable && (
              <Button variant="tertiary" onClick={onClose}>
                I haven’t started a collection yet
              </Button>
            )}
          </Stack>
        }
      >
        <Stack gap={2}>
          {description && (
            <Text variant="sm-display" color="black60">
              {description}
            </Text>
          )}

          <LabeledInput
            ref={inputRef}
            placeholder="Search artists for artists on Artsy"
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
                  <CloseIcon fill="black60" aria-hidden />
                </Clickable>
              ) : (
                <SearchIcon fill="black60" aria-hidden />
              )
            }
            value={query}
            onChange={event => {
              setQuery(event.currentTarget.value)
            }}
          />

          <Stack gap={0.5}>
            {query.length > 0 && (
              <Text variant="xs" color="black60">
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
              {selected.length} artist{selected.length === 1 ? "" : "s"}{" "}
              selected
            </Text>
          </Stack>

          {debouncedQuery.length === 0 && (
            <Message>
              Results will appear here as you search. Select an artist to add
              them to your collection.
            </Message>
          )}

          {!loading && debouncedQuery.length > 0 && artists.length === 0 && (
            <Message>No results found for {debouncedQuery}</Message>
          )}

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
                      id => id !== String(artist.internalID)
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
      </ModalDialog>

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
  query CollectorProfileArtistsAddDialogQuery($query: String!) {
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
  mutation CollectorProfileArtistsAddDialogCreateUserInterestsMutation(
    $input: CreateUserInterestsMutationInput!
  ) {
    createUserInterests(input: $input) {
      me {
        ...CollectorProfileArtistsList_me @arguments(page: 1, size: 10)
      }
    }
  }
`
