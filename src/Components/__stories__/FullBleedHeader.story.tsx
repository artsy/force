import { Flex, Text } from "@artsy/palette"
import {
  FullBleedHeader,
  type FullBleedHeaderProps,
} from "Components/FullBleedHeader/FullBleedHeader"
import { States } from "storybook-states"

export default {
  title: "Components/FullBleedHeader",
}

// TODO: Need to provide Sharify for resize function to work
export const Default = () => {
  return (
    <States<Partial<FullBleedHeaderProps>>
      states={[
        {},
        {
          children: (
            <Flex
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                variant="xxl"
                color="mono0"
                style={{ textShadow: "0 0 15px rgba(0, 0, 0, 0.25)" }}
              >
                Hello World
              </Text>
            </Flex>
          ),
        },
      ]}
    >
      <FullBleedHeader src="https://picsum.photos/id/237/2000/300" />
    </States>
  )
}
