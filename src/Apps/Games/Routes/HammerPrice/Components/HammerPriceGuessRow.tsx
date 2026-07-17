import { Flex, Text, VisuallyHidden } from "@artsy/palette"
import {
  currencyPrefix,
  hasSeparatorBefore,
} from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"

type DigitCellState = DigitFeedback | "pending" | "empty"

export interface HammerPriceGuessRowProps {
  digitCount: number
  currency: string
  /** 0 to `digitCount` digits, filled left to right */
  digits: string
  /** Present only for submitted (immutable) rows */
  feedback?: DigitFeedback[]
  /** Full screen-reader description of the row */
  label: string
}

export const HammerPriceGuessRow: React.FC<
  React.PropsWithChildren<HammerPriceGuessRowProps>
> = ({ digitCount, currency, digits, feedback, label }) => {
  const getCellState = (index: number): DigitCellState => {
    if (feedback) {
      return feedback[index]
    }

    if (digits[index]) {
      return "pending"
    }

    return "empty"
  }

  return (
    <Flex as="li" alignItems="center" style={{ listStyle: "none" }}>
      <VisuallyHidden>{label}</VisuallyHidden>

      <Text
        variant={["xs", "sm"]}
        color="mono60"
        mr={0.5}
        aria-hidden="true"
        // Keep rows aligned regardless of the currency prefix width
        minWidth={["24px", "32px"]}
        textAlign="right"
      >
        {currencyPrefix(currency).trim()}
      </Text>

      {Array.from({ length: digitCount }, (_, index) => {
        return (
          <Flex key={index} alignItems="center" aria-hidden="true">
            {hasSeparatorBefore({ index, digitCount }) && (
              <Text
                variant={["sm-display", "lg-display"]}
                color="mono60"
                px={0.5}
              >
                ,
              </Text>
            )}

            <DigitCell
              state={getCellState(index)}
              digit={digits[index] ?? ""}
            />
          </Flex>
        )
      })}
    </Flex>
  )
}

interface DigitCellProps {
  state: DigitCellState
  digit: string
}

const CELL_APPEARANCE: Record<
  DigitCellState,
  { bg: string; color: string; borderColor: string }
> = {
  exact: { bg: "green100", color: "mono0", borderColor: "green100" },
  close: { bg: "yellow100", color: "mono100", borderColor: "yellow100" },
  miss: { bg: "mono10", color: "mono60", borderColor: "mono10" },
  pending: { bg: "mono0", color: "mono100", borderColor: "mono60" },
  empty: { bg: "mono0", color: "mono100", borderColor: "mono15" },
}

const DigitCell: React.FC<React.PropsWithChildren<DigitCellProps>> = ({
  state,
  digit,
}) => {
  const appearance = CELL_APPEARANCE[state]

  return (
    <Flex
      width={["28px", "40px"]}
      height={["36px", "48px"]}
      mx="1px"
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      borderColor={appearance.borderColor}
      bg={appearance.bg}
    >
      <Text variant={["sm-display", "lg-display"]} color={appearance.color}>
        {digit}
      </Text>
    </Flex>
  )
}
