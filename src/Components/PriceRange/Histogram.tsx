import { Box, Flex, type FlexProps, RANGE_HANDLE_SIZE } from "@artsy/palette"

const BAR_WIDTH = 2
const BAR_ROUNDNESS = 10
const HISTOGRAM_MARGIN = `${RANGE_HANDLE_SIZE / 2}px`

type Range = [number, number]

export interface HistogramBarEntity {
  count: number
  value: number
}

interface HistogramProps extends FlexProps {
  selectedRange: Range
  bars: HistogramBarEntity[]
}

const isSelected = (value: number, min: number, max: number) => {
  return value >= min && value <= max
}

const getPercentByEntity = (maxValue: number, entityCount: number) => {
  if (maxValue === 0) {
    return 100
  }

  return (100 / maxValue) * entityCount
}

export const Histogram: React.FC<React.PropsWithChildren<HistogramProps>> = ({
  bars,
  selectedRange,
  ...other
}) => {
  const maxValue = Math.max(...bars.map(bar => bar.count))
  const [min, max] = selectedRange

  return (
    <Flex
      px={HISTOGRAM_MARGIN}
      height={110}
      justifyContent="space-between"
      alignItems="flex-end"
      {...other}
    >
      {bars.map((entity, index) => {
        const percent = getPercentByEntity(maxValue, entity.count)
        const selected = isSelected(entity.value, min, max)

        return (
          <Box
            key={`bar-${index}`}
            height={`${percent}%`}
            bg={selected ? "blue100" : "mono15"}
            width={BAR_WIDTH}
            borderTopLeftRadius={BAR_ROUNDNESS}
            borderTopRightRadius={BAR_ROUNDNESS}
          />
        )
      })}
    </Flex>
  )
}
