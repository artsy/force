import {
  AutocompleteInput,
  Banner,
  Box,
  Button,
  CheckIcon,
  Clickable,
  ClickableProps,
  CloseIcon,
  Text,
} from "@artsy/palette"
import React from "react"
import { useState } from "react"
import { graphql } from "relay-runtime"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useInquiryContext } from "../InquiryContext"
import { useSystemContext } from "v2/System"
import { InquiryGalleriesYouWorkWithQuery } from "v2/__generated__/InquiryGalleriesYouWorkWithQuery.graphql"
import { uniqBy } from "lodash"
import { useUpdateCollectorProfile } from "../useUpdateCollectorProfile"
import { logger } from "../util"

type Option = { text: string; value: string }

enum Mode {
  Pending,
  Loading,
  Success,
  Error,
}

export const InquiryGalleriesYouWorkWith: React.FC = () => {
  const { next } = useInquiryContext()

  const [mode, setMode] = useState(Mode.Pending)

  const { submitUpdateCollectorProfile } = useUpdateCollectorProfile()

  const [selection, setSelection] = useState<Option[]>([])

  const handleSelect = (option: Option) => {
    setSelection(prevSelection => {
      return uniqBy([...prevSelection, option], ({ value }) => value)
    })
  }

  const handleRemove = (option: Option) => () => {
    setSelection(prevSelection =>
      prevSelection.filter(({ value }) => value !== option.value)
    )
  }

  const handleClick = async () => {
    setMode(Mode.Loading)

    const affiliatedGalleryIds = selection.map(({ value }) => value)

    try {
      await submitUpdateCollectorProfile({ affiliatedGalleryIds })
      setMode(Mode.Success)
      next()
    } catch (err) {
      logger.error(err)
      setMode(Mode.Error)
    }
  }

  return (
    <>
      <Text variant="lg" mb={2}>
        What galleries do you work with?{" "}
        <Box color="black60" as="span">
          (Optional)
        </Box>
      </Text>

      {mode === Mode.Error && (
        <Banner variant="error" dismissable my={2}>
          Something went wrong. Please try again.
        </Banner>
      )}

      <InquiryGalleriesYouWorkWithAutocompleteQueryRenderer
        onSelect={handleSelect}
      />

      <Box minHeight={300} my={2}>
        {selection.map((option, i) => {
          return (
            <Text
              key={option.value}
              variant="md"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={2}
              {...(i === 0 ? { borderTop: "1px solid" } : {})}
              borderBottom="1px solid"
              borderColor="black10"
            >
              {option.text}

              <RemoveButton onClick={handleRemove(option)} />
            </Text>
          )
        })}
      </Box>

      <Button
        type="submit"
        width="100%"
        loading={mode === Mode.Loading}
        disabled={mode === Mode.Success}
        onClick={handleClick}
      >
        Next
      </Button>
    </>
  )
}

const RemoveButton: React.FC<ClickableProps> = props => {
  const [hovered, setHovered] = useState(false)
  return (
    <Clickable
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Remove"
      {...props}
    >
      {hovered ? <CloseIcon fill="red100" /> : <CheckIcon fill="black60" />}
    </Clickable>
  )
}

interface InquiryGalleriesYouWorkWithAutocompleteQueryRendererProps {
  onSelect(option: Option): void
}

const InquiryGalleriesYouWorkWithAutocompleteQueryRenderer: React.FC<InquiryGalleriesYouWorkWithAutocompleteQueryRendererProps> = ({
  onSelect,
}) => {
  const { relayEnvironment } = useSystemContext()

  const [query, setQuery] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value)
  }

  const handleSelect = (option: Option) => {
    setQuery("") // Reset query
    onSelect(option)
  }

  return (
    <SystemQueryRenderer<InquiryGalleriesYouWorkWithQuery>
      environment={relayEnvironment}
      query={graphql`
        query InquiryGalleriesYouWorkWithQuery($term: String!) {
          external {
            galleries(size: 5, term: $term) {
              internalID
              name
            }
          }
        }
      `}
      variables={{ term: query }}
      placeholder={
        <AutocompleteInput
          options={[]}
          placeholder="Search"
          mb={2}
          onChange={handleChange}
          value={query}
        />
      }
      render={({ props, error }) => {
        if (!props || !props.external || error) {
          return (
            <AutocompleteInput
              options={[]}
              placeholder="Search"
              mb={2}
              onChange={handleChange}
              value={query}
              // TODO: Loading
            />
          )
        }

        const options = props.external.galleries.map(gallery => ({
          text: gallery.name,
          value: gallery.internalID,
        }))

        return (
          <AutocompleteInput
            options={options}
            placeholder="Search"
            mb={2}
            onChange={handleChange}
            onSelect={handleSelect}
            value={query}
          />
        )
      }}
    />
  )
}
