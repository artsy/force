import { Flex, Text, usePrevious } from "@artsy/palette"
import {
  DEFAULT_HYBRID_WEIGHTS,
  HYBRID_WEIGHTS_MAX,
  HYBRID_WEIGHTS_MIN,
  HYBRID_WEIGHTS_STEP,
  type HybridWeightsRange as HybridWeightsRangeTuple,
  parseHybridWeights,
  roundToStep,
} from "Components/HybridWeights/constants"
import { type ChangeEvent, type FC, useEffect, useState } from "react"
import styled from "styled-components"
import { useDebouncedCallback } from "use-debounce"

interface HybridWeightsRangeProps {
  value?: string
  onDebouncedUpdate?: (range: HybridWeightsRangeTuple) => void
}

/**
 * Single-thumb slider for the hybrid `[lexical, neural]` blend. The thumb sets the
 * lexical weight; neural is always `1 - lexical`, so the two always sum to 1.0.
 * Dragging left lowers lexical and raises neural.
 */
export const HybridWeightsRange: FC<
  React.PropsWithChildren<HybridWeightsRangeProps>
> = ({ value = DEFAULT_HYBRID_WEIGHTS, onDebouncedUpdate }) => {
  const [lexical, setLexical] = useState(() => parseHybridWeights(value)[0])

  const previousValue = usePrevious(value)

  useEffect(() => {
    if (previousValue === value) return
    setLexical(parseHybridWeights(value)[0])
  }, [previousValue, value])

  const handleDebouncedUpdate = useDebouncedCallback(
    (range: HybridWeightsRangeTuple) => {
      onDebouncedUpdate?.(range)
    },
    250,
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextLexical = roundToStep(Number(event.currentTarget.value))
    const nextNeural = roundToStep(1 - nextLexical)

    setLexical(nextLexical)
    handleDebouncedUpdate([nextLexical, nextNeural])
  }

  const neural = roundToStep(1 - lexical)

  return (
    <>
      <Slider
        min={HYBRID_WEIGHTS_MIN}
        max={HYBRID_WEIGHTS_MAX}
        step={HYBRID_WEIGHTS_STEP}
        value={lexical}
        onChange={handleChange}
        aria-label="Hybrid weights"
      />

      <Flex justifyContent="space-between" mt={1}>
        <Text variant="xs" color="mono60">
          Lexical {lexical}
        </Text>

        <Text variant="xs" color="mono60">
          Neural {neural}
        </Text>
      </Flex>
    </>
  )
}

const Slider = styled.input.attrs({ type: "range" })`
  width: 100%;
`
