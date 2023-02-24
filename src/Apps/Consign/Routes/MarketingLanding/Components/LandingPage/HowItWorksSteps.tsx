import { Button, Column, GridColumns, Text } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/SystemContext"
import { RouterLink } from "System/Router/RouterLink"

const reasons = [
  {
    index: "01",
    title: "Submit your artwork",
    text:
      "Upload artwork images and details through our online tool. Our specialists will let you know if we currently have market demand.",
  },
  {
    index: "02",
    title: "Meet your expert",
    text:
      "If your artwork is accepted, you’re matched with a specialist to guide you on pricing, sales options, and vetting potential buyers.",
  },
  {
    index: "03",
    title: "Get a sales option",
    text:
      "You’ll get a tailored sales strategy with a price estimate and we select the best sales option for your work, either auction, private sale or direct listing on Artsy.",
  },
  {
    index: "04",
    title: "Sell your work",
    text:
      "Your artwork stays with you until it sells. Meanwhile, our logistics team handles everything, from organizing shipping to getting your payment to you.",
  },
]

export const HowItWorksSteps: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const trackStartSellingClick = () => {
    trackEvent({
      action: "clickedStartSelling",
      context_module: "HowItWorks",
      context_page_owner_type: contextPageOwnerType,
      label: "Start Selling",
      destination_path: "/sell/submission",
      user_id: user?.id,
    })
  }

  return (
    <>
      <Text mb={[2, 4, 6]} variant={["lg-display", "xl", "xxl"]}>
        How it works
      </Text>
      <GridColumns gridColumnGap={[0, 2]} alignItems="flex-start">
        {reasons.map(i => (
          <RowItem index={i.index} title={i.title} text={i.text} />
        ))}
      </GridColumns>
      <Button
        // @ts-ignore
        as={RouterLink}
        mt={[2, 4]}
        width={["100%", 300]}
        variant="primaryBlack"
        to="/sell/submission"
        onClick={trackStartSellingClick}
        data-testid="start-selling-button"
      >
        Start Selling
      </Button>
    </>
  )
}

interface RowItemProps {
  index: string
  title: string
  text: string
}
const RowItem: React.FC<RowItemProps> = ({ index, title, text }) => {
  return (
    <Column span={3} mb={[2, 0]}>
      <Text mt={[0.5, 0]} variant={["lg-display", "xl", "xxl"]}>
        {index}
      </Text>
      <Text mt={[0.5, 2]} variant={["md", "lg-display", "xl"]}>
        {title}
      </Text>
      <Text mt={1} variant={["xs", "sm"]}>
        {text}
      </Text>
    </Column>
  )
}
