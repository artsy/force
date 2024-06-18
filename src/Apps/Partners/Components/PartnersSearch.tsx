import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  AutocompleteInputProps,
} from "@artsy/palette"
import { compact } from "lodash"
import React, { FC, useState } from "react"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useRouter } from "System/Hooks/useRouter"
import { PartnersSearchQuery } from "__generated__/PartnersSearchQuery.graphql"

const TYPES = {
  GALLERY: "Galleries",
  INSTITUTION: "Institutions",
} as const

type PartnerType = keyof typeof TYPES

interface PartnersSearchQueryRendererProps {
  type: "GALLERY" | "INSTITUTION"
}

export const PartnersSearchQueryRenderer: FC<PartnersSearchQueryRendererProps> = ({
  type,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { router, match } = useRouter()

  const [query, setQuery] = useState("")

  const handleSelect = (option: AutocompleteInputOptionType) => {
    router.push(`/partner/${option.value}`)
  }

  return (
    <SystemQueryRenderer<PartnersSearchQuery>
      environment={relayEnvironment}
      placeholder={
        <PartnersSearchInput
          onChange={setQuery}
          options={[]}
          query={query}
          type={type}
        />
      }
      variables={{
        near: match.location.query.near ?? null,
        partnerCategories: match.location.query.category,
        term: query,
        type,
      }}
      query={graphql`
        query PartnersSearchQuery(
          $near: String
          $partnerCategories: [String]
          $term: String
          $type: [PartnerClassification]
        ) {
          filterPartners(
            aggregations: [TOTAL]
            defaultProfilePublic: true
            eligibleForListing: true
            near: $near
            partnerCategories: $partnerCategories
            size: 9
            sort: RANDOM_SCORE_DESC
            term: $term
            type: $type
          ) {
            total
            hits {
              ... on Partner {
                text: name
                value: slug
              }
            }
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.filterPartners) {
          const options = compact(props.filterPartners.hits).map(
            ({ text, value }) => ({
              text: text!,
              value,
            })
          )

          return (
            <PartnersSearchInput
              onChange={setQuery}
              onSelect={handleSelect}
              options={options}
              query={query}
              type={type}
            />
          )
        }

        return (
          <PartnersSearchInput
            onChange={setQuery}
            options={[]}
            query={query}
            type={type}
          />
        )
      }}
    />
  )
}

interface PartnersSearchInputProps<T extends AutocompleteInputOptionType>
  extends Omit<AutocompleteInputProps<T>, "onChange"> {
  onChange(query: string): void
  query: string
  type: PartnerType
}

const PartnersSearchInput = <T extends AutocompleteInputOptionType>({
  onChange,
  options,
  query,
  type,
  ...rest
}: PartnersSearchInputProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <AutocompleteInput
      defaultValue={query}
      onChange={handleChange}
      options={options}
      placeholder={`All ${TYPES[type]}`}
      {...rest}
    />
  )
}
