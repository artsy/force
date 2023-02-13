import { Text } from "@artsy/palette"
import { FC } from "react"
import { States } from "storybook-states"
import { HeroCarousel, HeroCarouselProps } from "./HeroCarousel"

export default {
  title: "Components/HeroCarousel",
}

export const Default = () => {
  return (
    <States<Partial<HeroCarouselProps>>
      states={[
        {},
        { children: <ExampleCell>Single cell</ExampleCell> },
        { fullBleed: false },
        { fullBleed: false, progressbarVariant: "dot" },
      ]}
    >
      <HeroCarousel>
        <ExampleCell>1</ExampleCell>
        <ExampleCell>2</ExampleCell>
        <ExampleCell>3</ExampleCell>
      </HeroCarousel>
    </States>
  )
}

const ExampleCell: FC = ({ children }) => (
  <Text
    variant="xl"
    bg="black10"
    width="100%"
    height={500}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    {children}
  </Text>
)
