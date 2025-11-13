import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useDidMount } from "Utils/Hooks/useDidMount"
import {
  Box,
  Column,
  GridColumns,
  HorizontalOverflow,
  Join,
  Select,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { ShowsHeader_viewer$data } from "__generated__/ShowsHeader_viewer.graphql"
import { uniqBy } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { keyframes } from "styled-components"

interface ShowsHeaderProps {
  viewer: ShowsHeader_viewer$data
}

const DEFAULT_CITIES = [
  { text: "All", value: "" },
  { text: "Online Exclusive", value: "online" },
]

export const ShowsHeader: React.FC<
  React.PropsWithChildren<ShowsHeaderProps>
> = ({ viewer: { featuredCities, allCities } }) => {
  const { router } = useRouter()
  const isMounted = useDidMount()

  const handleSelect = (value: string) => {
    router.push(`/shows/${value}`)
  }

  const options = uniqBy([...DEFAULT_CITIES, ...allCities], city => city.value)

  return (
    <Box p={0} border="1px solid" borderColor="mono10">
      <GridColumns width="100%">
        <Column span={10} display={["none", "block"]}>
          <HorizontalOverflow height="100%" p={2} data-test="cities-rail">
            <Join separator={<Box mx={1} />}>
              {[
                ...DEFAULT_CITIES,
                ...featuredCities,
                { text: "All Cities", value: "all-cities" },
              ].map((city, _i) => {
                return (
                  <City
                    key={city.value}
                    to={`/shows/${city.value}`}
                    textDecoration="none"
                    exact
                    activeClassName="active"
                  >
                    <Text variant="sm-display">{city.text}</Text>
                  </City>
                )
              })}
            </Join>
          </HorizontalOverflow>
        </Column>

        <Column span={2} p={1} pl={[1, 0]}>
          {/* For some reason this is creating issues with SSR -> hydration
              styles, so only mount on client */}
          {isMounted ? (
            <SelectContainer>
              <Select
                width="100%"
                options={options}
                onSelect={handleSelect}
                disabled={!isMounted}
              />
            </SelectContainer>
          ) : (
            // Placeholder for SSR render
            <Box height={50} />
          )}
        </Column>
      </GridColumns>
    </Box>
  )
}

export const ShowsHeaderFragmentContainer = createFragmentContainer(
  ShowsHeader,
  {
    viewer: graphql`
      fragment ShowsHeader_viewer on Viewer {
        allCities: cities {
          text: name
          value: slug
        }
        featuredCities: cities(featured: true) {
          text: name
          value: slug
        }
      }
    `,
  }
)

const City = styled(RouterLink)`
  display: flex;
  align-items: center;

  &.active {
    color: ${themeGet("colors.brand")};
  }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(0px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const SelectContainer = styled(Box)`
  animation: ${fadeInUp} 0.2s linear forwards;
`
