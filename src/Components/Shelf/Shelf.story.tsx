import { Box, Text } from "@artsy/palette"
import React, { useEffect, useState } from "react"
import { States } from "storybook-states"
import { Shelf, ShelfProps } from "./Shelf"
import { ShelfNavigationProps, ShelfNext } from "./ShelfNavigation"

export default {
  title: "Components/Shelf",
}

const Demo = ({
  amount = 25,
  ...rest
}: Partial<ShelfProps> & { amount?: number }) => {
  return (
    <Shelf {...rest}>
      {Array.from(Array(amount))
        .map((_, i) => [300, 250, 200, 333, 400][i % 5])
        .map((height, j) => (
          <Box
            key={j}
            width={300}
            height={height}
            bg="black10"
            border="1px solid"
            borderColor="black30"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="sm-display">{j + 1}</Text>
          </Box>
        ))}
    </Shelf>
  )
}

export const Default = () => {
  return (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <States<Partial<ShelfProps>>
          states={[{}, { alignItems: "center" }, { showProgress: false }]}
        >
          <Demo />
        </States>
      </Box>
    </Box>
  )
}

export const DifferingAmounts = () => {
  return (
    <Box maxWidth={1920} mx="auto">
      <Box mx={[2, 4]}>
        <States<Partial<ShelfProps> & { amount: number }>
          states={[
            { amount: 1 },
            { amount: 3 },
            { amount: 20 },
            { amount: 10 },
          ]}
        >
          <Demo />
        </States>
      </Box>
    </Box>
  )
}

export const NavigationButtons = () => {
  return (
    <States<ShelfNavigationProps>
      states={[
        {},
        { hover: true },
        { focus: true },
        { disabled: true },
        { hover: true, focus: true },
      ]}
    >
      <ShelfNext />
    </States>
  )
}

export const ClientSideUpdates = () => {
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(Math.floor(Math.random() * Math.floor(15)) + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <pre>Amount: {amount}</pre>
      <Demo amount={amount} />
    </>
  )
}

ClientSideUpdates.story = {
  parameters: { chromatic: { disable: true } },
}
