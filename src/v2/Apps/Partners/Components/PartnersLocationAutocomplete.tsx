import { AutocompleteInput } from "@artsy/palette"
import { FC, useMemo, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { PartnersLocationAutocomplete_viewer } from "v2/__generated__/PartnersLocationAutocomplete_viewer.graphql"
import { PartnersLocationAutocompleteQuery } from "v2/__generated__/PartnersLocationAutocompleteQuery.graphql"
import { useRouter } from "v2/System/Router/useRouter"
import { omit } from "lodash"

interface PartnersLocationAutocompleteProps {
  viewer: PartnersLocationAutocomplete_viewer
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

    const filtered = cities.filter(({ text }) => {
      return text.toLowerCase().includes(value.toLowerCase())
    })

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
          text: name
          value: slug
          coordinates {
            lat
            lng
          }
        }
        allCities: cities {
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
