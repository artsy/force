import { Box, Clickable, Text } from "@artsy/palette"
import { action } from "@storybook/addon-actions"
import React, { useEffect, useState } from "react"
import {
  Carousel,
  CarouselCell,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
  CarouselRail,
} from "./"

export const LOREM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, adipisci. Voluptate voluptatum porro facere atque dolores est neque ipsam quaerat necessitatibus? Deleniti tempora assumenda accusantium, quia quo ad rem expedita!"

const Demo = ({
  widths = Array.from(Array(10)).map(_ => 300),
  heights = [400],
  ...rest
}: {
  widths?: Array<number | string>
  heights?: number[]
} & Omit<CarouselProps, "children">) => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Carousel onChange={action("onChange")} {...rest}>
        {widths.map((width, i) => {
          return (
            <Clickable
              key={i}
              width={width}
              height={heights[i % heights.length]}
              bg="black10"
              border="1px solid"
              borderColor="black30"
              p={1}
              textAlign="center"
            >
              <Text variant="xs">{i + 1}</Text>
            </Clickable>
          )
        })}
      </Carousel>
    </Box>
  )
}

export default { title: "Components/Carousel" }

export const Simple = () => {
  return <Demo />
}

export const Multiple = () => {
  return (
    <>
      <Demo />
      <Demo />
      <Demo />
    </>
  )
}

export const SinglePage = () => {
  const widths = [250, 250]
  return <Demo widths={widths} />
}

SinglePage.story = {
  name: "Single page",
}

export const SingleOverflowingItem = () => {
  const widths = [2000]
  return <Demo widths={widths} />
}

SingleOverflowingItem.story = {
  name: "Single overflowing item",
}

export const MultipleOverflowingItems = () => {
  const widths = [100, 2000, 1000, 100, 1000]
  return <Demo widths={widths} />
}

MultipleOverflowingItems.story = {
  name: "Multiple overflowing items",
}

export const TwoishPages = () => {
  const widths = Array.from(Array(5)).map(_ => 250)
  return <Demo widths={widths} />
}

TwoishPages.story = {
  name: "Two-(ish) pages",
}

export const ManyPages = () => {
  const widths = Array.from(Array(100)).map(_ => 250)
  return <Demo widths={widths} />
}

ManyPages.story = {
  name: "Many pages",
}

export const VaryingWidths = () => {
  const widths = Array.from(Array(25)).map((_, i) => {
    if (i % 15 === 0) return 400
    if (i % 5 === 0) return 300
    if (i % 3 === 0) return 333
    if (i % 2 === 0) return 275
    return 250
  })

  return <Demo widths={widths} />
}

VaryingWidths.story = {
  name: "Varying widths",
}

export const VaryingHeights = () => {
  const widths = Array.from(Array(25)).map((_, i) => {
    if (i % 15 === 0) return 400
    if (i % 5 === 0) return 300
    if (i % 3 === 0) return 333
    if (i % 2 === 0) return 275
    return 250
  })

  return <Demo widths={widths} heights={[400, 300, 333, 275]} />
}

VaryingHeights.story = {
  name: "Varying heights",
}

export const DynamicItems = () => {
  const [widths, setWidths] = useState([300])
  useEffect(() => {
    const interval = setInterval(() => {
      setWidths(prevWidths => [...prevWidths, 300])
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return <Demo widths={widths} />
}

DynamicItems.story = {
  name: "Dynamic items",
  parameters: { chromatic: { disable: true } },
}

export const CustomArrows = () => {
  return (
    <Demo
      Previous={props => (
        <CarouselPrevious
          {...props}
          style={{ transform: "translateX(0)" }}
          bg="black5"
          color="red100"
          height={300}
          opacity={0.75}
          zIndex={1}
        />
      )}
      Next={props => {
        return (
          <CarouselNext
            {...props}
            style={{ transform: "translateX(0)" }}
            bg="black5"
            color="red100"
            height={300}
            opacity={0.75}
            zIndex={1}
          />
        )
      }}
    />
  )
}

CustomArrows.story = {
  name: "Custom arrows",
}

export const CustomRailAndCells = () => {
  return (
    <Demo
      widths={["100%", "100%", "100%", "100%"]}
      // eslint-disable-next-line react/display-name
      Cell={React.forwardRef((props, ref) => {
        return (
          <CarouselCell
            {...props}
            ref={ref as any}
            display="inline-flex"
            width="100%"
            pr={0}
          />
        )
      })}
      Rail={props => {
        return <CarouselRail {...props} transition="none" display="block" />
      }}
    />
  )
}

CustomRailAndCells.story = {
  name: "Custom rail and cells",
}

export const CarouselWithText = () => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Carousel>
        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>

        <Text bg="black10" p={1} width={300}>
          {LOREM}
        </Text>
      </Carousel>
    </Box>
  )
}

CarouselWithText.story = {
  name: "Carousel with text",
}

export const InitialIndexOnMount = () => {
  return <Demo initialIndex={3} />
}

InitialIndexOnMount.story = {
  name: "initialIndex on mount",
}

export const NavigateViaProps = () => {
  const [initialIndex, resetIndex] = useState(0)
  return (
    <Box>
      <Demo initialIndex={initialIndex} onChange={resetIndex} />
      <Box display="flex" justifyContent="space-around">
        <Clickable onClick={() => resetIndex(0)}>Navigate to page 1</Clickable>
        <Clickable onClick={() => resetIndex(1)}>Navigate to page 2</Clickable>
        <Clickable onClick={() => resetIndex(2)}>Navigate to page 3</Clickable>
        <Clickable onClick={() => resetIndex(3)}>Navigate to page 4</Clickable>
        <Clickable onClick={() => resetIndex(4)}>Navigate to page 5</Clickable>
      </Box>
    </Box>
  )
}

NavigateViaProps.story = {
  name: "Navigate via props",
}

export const ConditionalChildren = () => {
  return (
    <Box mx={[2, 4]} my={2}>
      <Carousel>
        <Box bg="black10" width={300} height={300} p={2}>
          <Text variant="xs">1</Text>
        </Box>

        <Box bg="black10" width={300} height={300} p={2}>
          <Text variant="xs">2</Text>
        </Box>

        {false && (
          <Box bg="black10" width={300} height={300} p={2}>
            <Text variant="xs">3</Text>
          </Box>
        )}

        {true && (
          <Box bg="black10" width={300} height={300} p={2}>
            <Text variant="xs">4</Text>
          </Box>
        )}

        <Box bg="black10" width={300} height={300} p={2}>
          <Text variant="xs">5</Text>
        </Box>

        <Box bg="black10" width={300} height={300} p={2}>
          <Text variant="xs">6</Text>
        </Box>
      </Carousel>
    </Box>
  )
}
