import { Box, Flex } from "@artsy/palette"

const BAR_WIDTH = 2
const BAR_ROUNDNESS = 10

type Range = [number, number]

interface BarChartProps {
  selectedRange: Range
  bars: number[]
}

const isSelected = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}

export const BarChart: React.FC<BarChartProps> = ({ bars, selectedRange }) => {
  const maxBarValue = Math.max(...bars)
  const [min, max] = selectedRange

  return (
    <Flex height={110} justifyContent="space-between" alignItems="flex-end">
      {bars.map(barValue => {
        const percent = (100 / maxBarValue) * barValue
        const selected = isSelected(barValue, min, max)

        return (
          <Box
            height={`${percent}%`}
            bg={selected ? "blue100" : "black15"}
            width={BAR_WIDTH}
            borderTopLeftRadius={BAR_ROUNDNESS}
            borderTopRightRadius={BAR_ROUNDNESS}
          />
        )
      })}
    </Flex>
  )
}
