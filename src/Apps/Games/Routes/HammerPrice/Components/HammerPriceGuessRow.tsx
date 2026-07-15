import { Box, Flex, Text, VisuallyHidden } from "@artsy/palette"
import {
  currencyPrefix,
  hasSeparatorBefore,
} from "Apps/Games/Routes/HammerPrice/Utils/priceDigits"
import type { DigitFeedback } from "Apps/Games/Routes/HammerPrice/Utils/scoreGuess"
import { Fragment, useEffect, useRef, useState } from "react"
import styled, { keyframes } from "styled-components"

type DigitCellState =
  | DigitFeedback
  | "active"
  | "pending"
  | "concealed"
  | "empty"

/** Duration of each half of a cell’s flip (conceal, then reveal), in ms */
export const REVEAL_FLIP_MS = 90

export interface HammerPriceGuessRowProps {
  digitCount: number
  currency: string
  /** 0 to `digitCount` digits, filled left to right */
  digits: string
  /** Present only for submitted (immutable) rows */
  feedback?: DigitFeedback[]
  /** The row currently accepting input; highlights the next empty cell */
  isActive?: boolean
  /** Whether the active row’s input is focused (drives the caret + brand outline) */
  isFocused?: boolean
  /** Play the flipboard reveal, one cell at a time, then call onRevealComplete */
  reveal?: boolean
  onRevealComplete?: () => void
  /** Full screen-reader description of the row */
  label: string
}

export const HammerPriceGuessRow: React.FC<
  React.PropsWithChildren<HammerPriceGuessRowProps>
> = ({
  digitCount,
  currency,
  digits,
  feedback,
  isActive,
  isFocused,
  reveal,
  onRevealComplete,
  label,
}) => {
  // While a reveal animation is running, how many cells have flipped to show
  // their feedback so far. Only meaningful when `reveal` is true — settled
  // rows (including those restored from storage) skip this and show their
  // full feedback immediately, see getCellState below.
  const [revealedCount, setRevealedCount] = useState(0)

  const cellRefs = useRef<Array<HTMLDivElement | null>>([])

  // Keep the latest completion callback without re-triggering the reveal.
  const onRevealCompleteRef = useRef(onRevealComplete)
  onRevealCompleteRef.current = onRevealComplete

  // Run once when this row starts revealing; digitCount/feedback are stable
  // for a given submitted guess, so they intentionally aren’t dependencies.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reveal is the sole trigger
  useEffect(() => {
    if (!reveal || !feedback) {
      return
    }

    let cancelled = false

    const supportsWAAPI =
      typeof cellRefs.current[0]?.animate === "function" &&
      !prefersReducedMotion()

    if (!supportsWAAPI) {
      setRevealedCount(digitCount)
      onRevealCompleteRef.current?.()

      return
    }

    const run = async () => {
      for (let index = 0; index < digitCount; index++) {
        if (cancelled) {
          return
        }

        const cell = cellRefs.current[index]

        try {
          // Flip the concealed face away…
          await cell?.animate(
            [
              { transform: "perspective(600px) rotateX(0deg)" },
              { transform: "perspective(600px) rotateX(90deg)" },
            ],
            { duration: REVEAL_FLIP_MS, easing: "ease-in" },
          )?.finished

          if (cancelled) {
            return
          }

          // …swap in the feedback colour at the edge…
          setRevealedCount(index + 1)

          // …then flip the revealed face into view.
          await cell?.animate(
            [
              { transform: "perspective(600px) rotateX(-90deg)" },
              { transform: "perspective(600px) rotateX(0deg)" },
            ],
            { duration: REVEAL_FLIP_MS, easing: "ease-out" },
          )?.finished
        } catch {
          // Animation cancelled (e.g. unmount); stop the sequence.
          return
        }
      }

      if (!cancelled) {
        onRevealCompleteRef.current?.()
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [reveal])

  const getCellState = (index: number): DigitCellState => {
    if (feedback) {
      // Only rows actively animating a reveal hide unrevealed cells behind
      // "concealed" — settled rows (including ones restored from storage,
      // which never ran the reveal effect) show their feedback immediately.
      if (!reveal) {
        return feedback[index]
      }

      return index < revealedCount ? feedback[index] : "concealed"
    }

    if (isActive && index === digits.length) {
      return "active"
    }

    if (digits[index]) {
      return "pending"
    }

    return "empty"
  }

  return (
    <Flex alignItems="center" gap={0.5}>
      <VisuallyHidden>{label}</VisuallyHidden>

      <Text
        variant={["xs", "sm"]}
        color="mono60"
        aria-hidden="true"
        minWidth={["24px", "32px"]}
        textAlign="right"
      >
        {currencyPrefix(currency).trim()}
      </Text>

      <Flex alignItems="center" gap={0.5} aria-hidden="true">
        {Array.from({ length: digitCount }, (_, index) => {
          const state = getCellState(index)

          return (
            <Fragment key={index}>
              {hasSeparatorBefore({ index, digitCount }) && (
                <Text variant={["sm-display", "lg-display"]} color="mono60">
                  ,
                </Text>
              )}

              <Flip
                ref={element => {
                  cellRefs.current[index] = element
                }}
              >
                <DigitCell
                  state={state}
                  digit={digits[index] ?? ""}
                  showCaret={state === "active" && !!isFocused}
                  focused={state === "active" && !!isFocused}
                />
              </Flip>
            </Fragment>
          )
        })}
      </Flex>
    </Flex>
  )
}

interface DigitCellProps {
  state: DigitCellState
  digit: string
  showCaret: boolean
  focused: boolean
}

const CELL_APPEARANCE: Record<
  DigitCellState,
  { bg: string; color: string; borderColor: string }
> = {
  exact: { bg: "green100", color: "mono0", borderColor: "green100" },
  close: { bg: "yellow100", color: "mono100", borderColor: "yellow100" },
  miss: { bg: "mono10", color: "mono60", borderColor: "mono10" },
  active: { bg: "mono0", color: "mono100", borderColor: "mono100" },
  pending: { bg: "mono0", color: "mono100", borderColor: "mono60" },
  concealed: { bg: "mono0", color: "mono100", borderColor: "mono30" },
  empty: { bg: "mono0", color: "mono100", borderColor: "mono15" },
}

const DigitCell: React.FC<React.PropsWithChildren<DigitCellProps>> = ({
  state,
  digit,
  showCaret,
  focused,
}) => {
  const appearance = CELL_APPEARANCE[state]

  return (
    <Flex
      data-cell-state={state}
      position="relative"
      width={["28px", "40px"]}
      height={["36px", "48px"]}
      alignItems="center"
      justifyContent="center"
      border="2px solid"
      borderColor={focused ? "brand" : appearance.borderColor}
      bg={appearance.bg}
    >
      <Text variant={["sm-display", "lg-display"]} color={appearance.color}>
        {digit}
      </Text>

      {showCaret && (
        <BlinkingCaret
          position="absolute"
          bottom="6px"
          left="50%"
          width="45%"
          height="2px"
          bg="brand"
          style={{ transform: "translateX(-50%)" }}
        />
      )}
    </Flex>
  )
}

const Flip = styled.div`
  transform-origin: center;
  backface-visibility: hidden;
`

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const BlinkingCaret = styled(Box)`
  animation: ${blink} 1s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const prefersReducedMotion = (): boolean => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return true
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
