import { Box, Column, GridColumns, SkeletonText } from "@artsy/palette"
import React from "react"

interface MarketStatsPlaceholderProps {
  done?: boolean
}

export const MarketStatsPlaceholder: React.FC<MarketStatsPlaceholderProps> = ({
  done = true,
}) => (
  <Box mb={[4, 12]} mt={[0, 6]}>
    <SkeletonText done={done} variant={["md", "lg"]}>
      Market Signals
    </SkeletonText>

    <SkeletonText done={done} variant={["md", "lg"]} mb={[2, 4]}>
      Averages over the last 36 months
    </SkeletonText>

    {/* Market Stats Values */}
    <GridColumns gridRowGap={[2, 2]}>
      <Column
        span={2}
        justifyContent="flex-end"
        display="flex"
        flexDirection="column"
        pt={0.5}
      >
        <SkeletonText done={done} variant="lg">
          MEDIUM
        </SkeletonText>
        <SkeletonText done={done} variant="xxl">
          SEL
        </SkeletonText>
      </Column>
      <Column span={10}>
        <GridColumns gridRowGap={[2, 2]}>
          <Column
            span={6}
            justifyContent="flex-end"
            display="flex"
            flexDirection="column"
          >
            <GridColumns gridRowGap={[2, 2]}>
              <Column span={[6]}>
                <SkeletonText done={done} variant={["xs", "sm"]} pb={[0.5, 1]}>
                  Yearly lots sold
                </SkeletonText>
                <SkeletonText
                  done={done}
                  variant={["xxl", "xxl"]}
                  data-test-id="annualLotsSold"
                >
                  6
                </SkeletonText>
              </Column>

              <Column span={[6]}>
                <SkeletonText done={done} variant={["xs", "sm"]} pb={[0.5, 1]}>
                  Sell-through rate
                </SkeletonText>
                <SkeletonText done={done} variant={["xxl", "xxl"]}>
                  90.9%
                </SkeletonText>
              </Column>
            </GridColumns>
          </Column>

          <Column span={6}>
            <GridColumns gridRowGap={[2, 2]}>
              <Column
                span={[6]}
                justifyContent="flex-end"
                display="flex"
                flexDirection="column"
              >
                <SkeletonText done={done} variant={["xs", "sm"]} pb={[0.5, 1]}>
                  Sale price
                </SkeletonText>

                <SkeletonText done={done} variant={["xxl", "xxl"]}>
                  $492k
                </SkeletonText>
              </Column>

              <Column
                span={[6]}
                justifyContent="flex-end"
                display="flex"
                flexDirection="column"
              >
                <SkeletonText done={done} variant={["xs", "sm"]} pb={[0.5, 1]}>
                  Price over estimate
                </SkeletonText>

                <SkeletonText done={done} variant={["xxl", "xxl"]}>
                  ↑400%
                </SkeletonText>
              </Column>
            </GridColumns>
          </Column>
        </GridColumns>
      </Column>
    </GridColumns>
  </Box>
)
