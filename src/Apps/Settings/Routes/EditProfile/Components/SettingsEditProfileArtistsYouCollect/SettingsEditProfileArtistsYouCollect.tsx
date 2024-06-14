import {
  AutocompleteInput,
  Box,
  BoxProps,
  Text,
  useToasts,
} from "@artsy/palette"
import { compact } from "lodash"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { SettingsEditProfileArtistsYouCollectAutocompleteQuery } from "__generated__/SettingsEditProfileArtistsYouCollectAutocompleteQuery.graphql"
import { SettingsEditProfileArtistsYouCollect_me$data } from "__generated__/SettingsEditProfileArtistsYouCollect_me.graphql"
import { SettingsEditProfileArtistsYouCollectRemoveButton } from "./SettingsEditProfileArtistsYouCollectRemoveButton"
import { useAddArtistYouCollect } from "./useAddArtistYouCollect"
import { useRemoveArtistYouCollect } from "./useRemoveArtistYouCollect"

interface SettingsEditProfileArtistsYouCollectProps {
  me: SettingsEditProfileArtistsYouCollect_me$data
}

export const SettingsEditProfileArtistsYouCollect: FC<SettingsEditProfileArtistsYouCollectProps> = ({
  me,
}) => {
  const userInterests = compact(me.collectorProfile?.userInterests)

  const { submitAddArtistYouCollect } = useAddArtistYouCollect()
  const { submitRemoveArtistYouCollect } = useRemoveArtistYouCollect()

  const { sendToast } = useToasts()

  const [loading, setLoading] = useState(false)

  const handleSelect = async (option: { text: string; value: string }) => {
    setLoading(true)

    try {
      await submitAddArtistYouCollect(option.value)
    } catch (err) {
      console.error(err)
      sendToast({ variant: "error", message: "Something went wrong." })
    }

    setLoading(false)
  }

  const handleRemove = (id: string) => async () => {
    setLoading(true)

    try {
      await submitRemoveArtistYouCollect(id)
    } catch (err) {
      console.error(err)
      sendToast({ variant: "error", message: "Something went wrong." })
    }

    setLoading(false)
  }

  return (
    <>
      <Text variant={["md", "lg"]} mb={4}>
        Artists You Collect
      </Text>

      <Text variant="sm" mb={1}>
        Adding artists that you collect will help Artsy and galleries to best
        serve your needs when answering your inquiry.
      </Text>

      <SettingsEditProfileArtistsYouCollectAutocompleteInput
        onSelect={handleSelect}
        mb={4}
      />

      <Box style={{ opacity: loading ? 0.5 : 1, transition: "opacity 250ms" }}>
        {userInterests.map(userInterest => {
          if (
            !(
              userInterest?.category === "COLLECTED_BEFORE" &&
              userInterest.interest.__typename === "Artist"
            )
          ) {
            return
          }

          const artist = userInterest.interest

          return (
            <Text
              key={artist.internalID}
              variant="sm-display"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderTop="1px solid"
              borderColor="black10"
            >
              {artist.name}

              <SettingsEditProfileArtistsYouCollectRemoveButton
                data-test={userInterest.interest.name}
                onClick={handleRemove(userInterest.internalID)}
                p={2}
              />
            </Text>
          )
        })}
      </Box>
    </>
  )
}

export const SettingsEditProfileArtistsYouCollectFragmentContainer = createFragmentContainer(
  SettingsEditProfileArtistsYouCollect,
  {
    me: graphql`
      fragment SettingsEditProfileArtistsYouCollect_me on Me {
        collectorProfile {
          userInterests {
            internalID
            category
            interest {
              __typename
              ... on Artist {
                internalID
                name
                slug
              }
            }
          }
        }
      }
    `,
  }
)

interface SettingsEditProfileArtistsYouCollectAutocompleteInputProps
  extends BoxProps {
  onSelect(option: { text: string; value: string }): void
}

const SettingsEditProfileArtistsYouCollectAutocompleteInput: FC<SettingsEditProfileArtistsYouCollectAutocompleteInputProps> = ({
  onSelect,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()
  const [term, setTerm] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.currentTarget.value)
  }

  const handleSelect = (option: { text: string; value: string }) => {
    onSelect(option)
    setTerm("")
  }

  return (
    <SystemQueryRenderer<SettingsEditProfileArtistsYouCollectAutocompleteQuery>
      environment={relayEnvironment}
      variables={{ term }}
      query={graphql`
        query SettingsEditProfileArtistsYouCollectAutocompleteQuery(
          $term: String!
        ) {
          searchConnection(query: $term, entities: ARTIST, first: 5) {
            edges {
              node {
                text: displayLabel
                ... on Artist {
                  value: internalID
                }
              }
            }
          }
        }
      `}
      placeholder={
        <AutocompleteInput
          name="artistsYouCollect"
          loading
          onChange={handleChange}
          options={[]}
          placeholder="Search artists"
          {...rest}
        />
      }
      render={({ props, error }) => {
        if (!props || error) {
          return (
            <AutocompleteInput
              name="artistsYouCollect"
              loading
              onChange={handleChange}
              options={[]}
              placeholder="Search artists"
              {...rest}
            />
          )
        }

        const options = extractNodes(props.searchConnection).map(result => ({
          text: result.text!,
          value: result.value!,
        }))

        return (
          <AutocompleteInput
            name="artistsYouCollect"
            value={term}
            onChange={handleChange}
            onSelect={handleSelect}
            options={
              options.length > 0 || term === ""
                ? options
                : [{ text: "No results", value: "" }]
            }
            placeholder="Search artists"
            {...rest}
          />
        )
      }}
    />
  )
}
