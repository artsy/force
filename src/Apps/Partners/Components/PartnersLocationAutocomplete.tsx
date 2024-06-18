import { AutocompleteInput, Box, Text } from "@artsy/palette"
import { FC, useMemo, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PartnersLocationAutocomplete_viewer$data } from "__generated__/PartnersLocationAutocomplete_viewer.graphql"
import { PartnersLocationAutocompleteQuery } from "__generated__/PartnersLocationAutocompleteQuery.graphql"
import { useRouter } from "System/Hooks/useRouter"
import { omit } from "lodash"
import { filterCities } from "Apps/Partners/Utils/filterUtils"

interface PartnersLocationAutocompleteProps {
  viewer: PartnersLocationAutocomplete_viewer$data
}

const PartnersLocationAutocomplete: FC<PartnersLocationAutocompleteProps> = ({
  viewer: { featuredCities, allCities },
}) => {
  const { router, match } = useRouter()

  const [options, setOptions] = useState([...featuredCities])

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value === "") {
      setOptions([...featuredCities])
      return
    }

    const cities = value.length > 2 ? allCities : featuredCities
    const filtered = filterCities(cities, value)

    setOptions(filtered)
  }

  const handleSelect = (option: typeof options[number]) => {
    if (option.value === "all") {
      router.push({
        pathname: match.location.pathname,
        query: {
          ...omit(match.location.query, "location", "near"),
        },
      })

      return
    }

    router.push({
      pathname: match.location.pathname,
      query: {
        ...match.location.query,
        location: option.value,
        near: [option.coordinates?.lat, option.coordinates?.lng].join(","),
      },
    })
  }

  const handleClear = () => {
    router.push({
      pathname: match.location.pathname,
      query: {
        ...omit(match.location.query, "location", "near"),
      },
    })
  }

  const defaultValue = useMemo(() => {
    const { location } = match.location.query

    if (!location) return

    return allCities.find(({ value }) => value === location)?.text
  }, [allCities, match.location.query])

  return (
    <AutocompleteInput
      options={[{ text: "All Locations", value: "all" }, ...options]}
      placeholder="All locations"
      onChange={handleChange}
      onSelect={handleSelect}
      onClear={handleClear}
      defaultValue={defaultValue}
      renderOption={option => {
        return (
          <Box {...("fullName" in option ? { px: 2, py: 1 } : { p: 2 })}>
            <Text variant="sm-display">{option.text}</Text>

            {"fullName" in option && (
              <Text variant="xs" color="black60">
                {option.fullName.split(", ").slice(1).join(", ")}
              </Text>
            )}
          </Box>
        )
      }}
    />
  )
}

const PartnersLocationAutocompletePlaceholder: FC = () => {
  return (
    <AutocompleteInput
      options={[{ text: "Loading...", value: "all" }]}
      placeholder="All locations"
      value=""
    />
  )
}

export const PartnersLocationAutocompleteFragmentContainer = createFragmentContainer(
  PartnersLocationAutocomplete,
  {
    viewer: graphql`
      fragment PartnersLocationAutocomplete_viewer on Viewer {
        featuredCities: cities(featured: true) {
          fullName
          text: name
          value: slug
          coordinates {
            lat
            lng
          }
        }
        allCities: cities {
          fullName
          text: name
          value: slug
          coordinates {
            lat
            lng
          }
        }
      }
    `,
  }
)

export const PartnersLocationAutocompleteQueryRenderer: FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PartnersLocationAutocompleteQuery>
      environment={relayEnvironment}
      placeholder={<PartnersLocationAutocompletePlaceholder />}
      query={graphql`
        query PartnersLocationAutocompleteQuery {
          viewer {
            ...PartnersLocationAutocomplete_viewer
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
            <PartnersLocationAutocompleteFragmentContainer
              viewer={props.viewer}
            />
          )
        }

        return <PartnersLocationAutocompletePlaceholder />
      }}
    />
  )
}
