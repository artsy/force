import {
  AutocompleteInput,
  AutocompleteInputOptionType,
  Sup,
  Text,
} from "@artsy/palette"
import { FC, useMemo, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PartnersSpecialtyAutocomplete_viewer$data } from "__generated__/PartnersSpecialtyAutocomplete_viewer.graphql"
import { PartnersSpecialtyAutocompleteQuery } from "__generated__/PartnersSpecialtyAutocompleteQuery.graphql"
import { useRouter } from "System/Hooks/useRouter"
import { compact, omit } from "lodash"

interface PartnersSpecialtyAutocompleteProps {
  viewer: PartnersSpecialtyAutocomplete_viewer$data
}

const PartnersSpecialtyAutocomplete: FC<PartnersSpecialtyAutocompleteProps> = ({
  viewer: { allOptions, filterPartners },
}) => {
  const specialties = useMemo(() => {
    return compact(filterPartners?.aggregations?.[0]?.counts)
  }, [filterPartners])

  const all = useMemo(() => {
    return compact(allOptions?.aggregations?.[0]?.counts)
  }, [allOptions])

  const { router, match } = useRouter()

  const [options, setOptions] = useState(specialties)

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(
      specialties.filter(({ text }) =>
        text.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleSelect = ({ value }: AutocompleteInputOptionType) => {
    if (value === "all") {
      router.push({
        pathname: match.location.pathname,
        query: { ...omit(match.location.query, "category") },
      })

      return
    }

    router.push({
      pathname: match.location.pathname,
      query: { ...match.location.query, category: value },
    })
  }

  const handleClear = () => {
    router.push({
      pathname: match.location.pathname,
      query: {
        ...omit(match.location.query, "category"),
      },
    })
  }

  const defaultValue = useMemo(() => {
    const { category } = match.location.query

    if (!category) return

    return all.find(({ value }) => value === category)?.text
  }, [all, match.location.query])

  return (
    <AutocompleteInput<typeof options[number]>
      options={[
        {
          text: `All Specialties`,
          value: "all",
          count: filterPartners?.total ?? 0,
        },
        ...options,
      ]}
      placeholder="All specialties"
      onChange={handleChange}
      onSelect={handleSelect}
      onClear={handleClear}
      defaultValue={defaultValue}
      renderOption={option => {
        return (
          <Text variant="sm-display" lineHeight={1} p={2} overflowEllipsis>
            {option.text} <Sup color="brand">{option.count}</Sup>
          </Text>
        )
      }}
    />
  )
}

const PartnersSpecialtyAutocompletePlaceholder: FC = () => {
  return (
    <AutocompleteInput
      options={[{ text: "Loading...", value: "all" }]}
      placeholder="All specialties"
      value=""
    />
  )
}

export const PartnersSpecialtyAutocompleteFragmentContainer = createFragmentContainer(
  PartnersSpecialtyAutocomplete,
  {
    viewer: graphql`
      fragment PartnersSpecialtyAutocomplete_viewer on Viewer
        @argumentDefinitions(
          near: { type: "String" }
          type: { type: "[PartnerClassification]" }
        ) {
        allOptions: filterPartners(
          aggregations: [CATEGORY]
          defaultProfilePublic: true
          eligibleForListing: true
          size: 0
        ) {
          aggregations {
            counts {
              text: name
              value
              count
            }
          }
        }
        filterPartners(
          aggregations: [CATEGORY, TOTAL]
          defaultProfilePublic: true
          eligibleForListing: true
          near: $near
          size: 0
          type: $type
        ) {
          total
          aggregations {
            counts {
              text: name
              value
              count
            }
          }
        }
      }
    `,
  }
)

interface PartnersSpecialtyAutocompleteQueryRendererProps {
  type: "GALLERY" | "INSTITUTION"
}

export const PartnersSpecialtyAutocompleteQueryRenderer: FC<PartnersSpecialtyAutocompleteQueryRendererProps> = ({
  type,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <SystemQueryRenderer<PartnersSpecialtyAutocompleteQuery>
      environment={relayEnvironment}
      placeholder={<PartnersSpecialtyAutocompletePlaceholder />}
      variables={{ near: match.location.query.near ?? null, type }}
      query={graphql`
        query PartnersSpecialtyAutocompleteQuery(
          $near: String
          $type: [PartnerClassification]
        ) {
          viewer {
            ...PartnersSpecialtyAutocomplete_viewer
              @arguments(near: $near, type: $type)
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.viewer) {
          return (
            <PartnersSpecialtyAutocompleteFragmentContainer
              viewer={props.viewer}
            />
          )
        }

        return <PartnersSpecialtyAutocompletePlaceholder />
      }}
    />
  )
}
