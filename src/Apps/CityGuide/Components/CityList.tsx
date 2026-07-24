import {
  Box,
  Column,
  GridColumns,
  HorizontalOverflow,
  Join,
  Select,
  Text,
} from "@artsy/palette"
import { useDidMount } from "Utils/Hooks/useDidMount"
import styled from "styled-components"

interface City {
  name: string
  country: string
  latitude: number
  longitude: number
  galleryCount: number
  locations: any[]
}

interface CityListProps {
  cities: City[]
  selectedCity: City | null
  onCityClick: (city: City) => void
}

export const CityList = ({
  cities,
  selectedCity,
  onCityClick,
}: CityListProps) => {
  const isMounted = useDidMount()

  // Sort cities alphabetically
  const sortedCities = [...cities].sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  // Create options for dropdown
  const options = sortedCities.map(city => {
    return {
      text: city.name,
      value: city.name,
    }
  })

  const handleSelect = (value: string) => {
    const city = sortedCities.find(c => {
      return c.name === value
    })
    if (city) {
      onCityClick(city)
    }
  }

  return (
    <Box p={0} border="1px solid" borderColor="mono10">
      <GridColumns width="100%">
        <Column span={10} display={["none", "block"]}>
          <HorizontalOverflow height="100%" p={2} data-test="cities-rail">
            <Join separator={<Box mx={1} />}>
              {sortedCities.map(city => {
                const isActive = selectedCity?.name === city.name

                return (
                  <CityButton
                    key={city.name}
                    onClick={() => {
                      return onCityClick(city)
                    }}
                    $isActive={isActive}
                  >
                    <Text variant="sm-display">{city.name}</Text>
                  </CityButton>
                )
              })}
            </Join>
          </HorizontalOverflow>
        </Column>

        <Column span={2} p={1} pl={[1, 0]}>
          {isMounted ? (
            <SelectContainer>
              <Select
                width="100%"
                options={options}
                onSelect={handleSelect}
                disabled={!isMounted}
                title="Select a city"
              />
            </SelectContainer>
          ) : (
            <Box height={50} />
          )}
        </Column>
      </GridColumns>
    </Box>
  )
}

const CityButton = styled(Box)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  color: ${props => {
    return props.$isActive ? props.theme.colors.brand : "inherit"
  }};

  &:hover {
    color: ${props => {
      return props.theme.colors.brand
    }};
  }
`

const SelectContainer = styled(Box)`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(0px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation: fadeInUp 0.2s linear forwards;
`
