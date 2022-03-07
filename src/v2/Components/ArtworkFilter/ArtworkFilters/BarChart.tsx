import { Box, Flex } from "@artsy/palette"

const BAR_WIDTH = 2
const BAR_ROUNDNESS = 10

type Range = [number, number]

export interface BarEntity {
  counts: number
  value: number
}

interface BarChartProps {
  selectedRange: Range
  bars: BarEntity[]
}

const isSelected = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}

export const BarChart: React.FC<BarChartProps> = ({ bars, selectedRange }) => {
  const maxValue = Math.max(...bars.map(bar => bar.counts))
  const [min, max] = selectedRange

  return (
    <Flex height={110} justifyContent="space-between" alignItems="flex-end">
      {bars.map((entity, index) => {
        const percent = (100 / maxValue) * entity.counts
        const selected = isSelected(entity.value, min, max)

        return (
          <Box
            key={`bar-${index}`}
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
