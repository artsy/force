import type { Meta } from "@storybook/react"
import { QuickMultipleSelectAlertFilter } from "./QuickMultipleSelectAlertFilter"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { Box } from "@artsy/palette"
import { ComponentStory } from "@storybook/react"

export const Basic: ComponentStory<typeof QuickMultipleSelectAlertFilter> = () => {
  return (
    <AlertProvider>
      <QuickMultipleSelectAlertFilter
        label="Colors"
        criteriaKey="colors"
        options={options}
      />
    </AlertProvider>
  )
}

export const WithDescription = () => {
  return (
    <AlertProvider>
      <QuickMultipleSelectAlertFilter
        label="Colors"
        description="Choose one or more of these colors for maximal colorfulness."
        criteriaKey="colors"
        options={options}
      />
    </AlertProvider>
  )
}

export const WithTruncation = () => {
  return (
    <AlertProvider>
      <QuickMultipleSelectAlertFilter
        label="Colors"
        criteriaKey="colors"
        options={options}
        truncate={4}
      />
    </AlertProvider>
  )
}

const options = [
  { name: "Red", value: "red" },
  { name: "Orange", value: "orange" },
  { name: "Yellow", value: "yellow" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Indigo", value: "indigo" },
  { name: "Violet", value: "violet" },
]

const meta: Meta<typeof QuickMultipleSelectAlertFilter> = {
  title: "Components/QuickMultipleSelectAlertFilter",
  decorators: [
    Story => (
      <Box width={[1.0, 400]}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
