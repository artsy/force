import {
  Clickable,
  Flex,
  InfoCircleIcon,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkDemandIndex_marketPriceInsights } from "__generated__/MyCollectionArtworkDemandIndex_marketPriceInsights.graphql"
import { DemandIndexBar } from "./DemandIndexBar"

interface MyCollectionArtworkDemandIndexProps {
  marketPriceInsights: MyCollectionArtworkDemandIndex_marketPriceInsights
}

const DemandIndexExplanation =
  "Overall strength of demand for this artist and medium combination. Based on the last 36 months of auction sale data from top commercial auction houses."

const MyCollectionArtworkDemandIndex: React.FC<MyCollectionArtworkDemandIndexProps> = ({
  marketPriceInsights,
}) => {
  if (!marketPriceInsights?.demandRank) {
    return null
  }

  const demandRank = Number((marketPriceInsights.demandRank * 10).toFixed(2))

  const adjustedDemandRank =
    demandRank.toFixed(1) === "10.0" ? "9.9" : demandRank

  const isHighDemand = Number(demandRank) >= 9
  const demandRankColor = demandRank >= 7 ? "blue100" : "black60"

  let barWidth = demandRank * 10
  if (barWidth > 100) {
    barWidth = 100
  }

  return (
    <>
      <Media greaterThanOrEqual="sm">
        <Text variant="lg">Demand Index</Text>

        <Text variant="md" color="black60">
          {DemandIndexExplanation}
        </Text>
      </Media>
      <Media lessThan="sm">
        <Flex>
          <Text variant={"sm-display"}>Demand Index</Text>

          <Tooltip
            placement="top-start"
            size="lg"
            content={<Text variant="xs">{DemandIndexExplanation}</Text>}
          >
            <Clickable ml={0.5} style={{ lineHeight: 0 }}>
              <InfoCircleIcon />
            </Clickable>
          </Tooltip>
        </Flex>
      </Media>

      <Spacer m={2} />

      <Text variant={["xl", "xxl"]} color={demandRankColor}>
        {adjustedDemandRank}
      </Text>
      <Flex flexDirection="row" alignItems="center">
        {!!isHighDemand && (
          <Flex data-testid="highDemandIcon" alignItems="center" mr={0.5}>
            <HighDemandIcon />
          </Flex>
        )}

        <Text variant={["md", "lg"]} color={demandRankColor}>
          {getDemandRankText(demandRank)}
        </Text>
      </Flex>

      <Spacer m={[2, 0]} />

      <DemandIndexBar progress={barWidth} />

      <Flex justifyContent="space-between">
        <Text variant="xs" color="black60">
          0.0
        </Text>
        <Text variant="xs" color="black60">
          10.0
        </Text>
      </Flex>
    </>
  )
}

const getDemandRankText = (demandRank: number) => {
  if (demandRank >= 9) {
    return "High Demand"
  } else if (demandRank >= 7) {
    return "Active Demand"
  } else if (demandRank >= 4) {
    return "Moderate Demand"
  }

  return "Less Active Demand"
}

const HighDemandIcon = () => {
  return (
    <svg width={22} height={22} viewBox="0 0 16 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00065 14.6668C11.6825 14.6668 14.6673 11.6821 14.6673 8.00016C14.6673 4.31826 11.6825 1.3335 8.00065 1.3335C4.31875 1.3335 1.33398 4.31826 1.33398 8.00016C1.33398 11.6821 4.31875 14.6668 8.00065 14.6668ZM11.825 6.22216L11.4677 8.4935L10.6736 7.82129L8.45131 9.70698L8.16375 9.95098L7.8762 9.70698L6.79125 8.78637L5.02004 10.2893L4.44493 9.61152L6.50369 7.8646L6.79125 7.62061L7.0788 7.8646L8.16375 8.78522L9.98588 7.23909L9.14902 6.53066L11.825 6.22216Z"
        fill="#1023D7"
      />
    </svg>
  )
}

export const MyCollectionArtworkDemandIndexFragmentContainer = createFragmentContainer(
  MyCollectionArtworkDemandIndex,
  {
    marketPriceInsights: graphql`
      fragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {
        demandRank
      }
    `,
  }
)
