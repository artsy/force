import { Button, Column, GridColumns, Text } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { RouterLink } from "System/Components/RouterLink"
import { ActionType, ContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"

const reasons = [
  {
    index: "01",
    title: "Submit your artwork",
    text:
      "Enter the artist’s name on the submission page. If the artist is in our database, you’ll be able to upload images and artwork details.",
  },
  {
    index: "02",
    title: "Meet your expert",
    text:
      "One of our specialists will review your submission and determine the best sales option.",
  },
  {
    index: "03",
    title: "Get a sales option",
    text:
      "Review your tailored sales strategy and price estimate. We’ll select the best way to sell your work—either at auction, through private sale, or a direct listing on Artsy.",
  },
  {
    index: "04",
    title: "Sell your work",
    text:
      "Keep your work until it sells, then let our team handle the logistics. No costly presale insurance, shipping, or handling fees.",
  },
]

export const HowItWorksSteps: React.FC = () => {
  const { user, isLoggedIn } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()
  const { showAuthDialog } = useAuthDialog()

  const trackStartSellingClick = () => {
    trackEvent({
      action: ActionType.tappedConsign,
      context_module: ContextModule.sellHowItWorks,
      context_page_owner_type: contextPageOwnerType,
      label: "Get Started",
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
          <RowItem
            key={i.index}
            index={i.index}
            title={i.title}
            text={i.text}
          />
        ))}
      </GridColumns>
      <Button
        // @ts-ignore
        as={RouterLink}
        mt={[2, 4]}
        width={["100%", 300]}
        variant="primaryBlack"
        to="/sell/submission"
        onClick={event => {
          if (!isLoggedIn) {
            event.preventDefault()

            showAuthDialog({
              mode: "Login",
              options: {
                title: () => {
                  return "Log in to submit an artwork for sale"
                },
              },
              analytics: {
                contextModule: ContextModule.sellHowItWorks,
                intent: Intent.login,
              },
            })

            return
          }
          trackStartSellingClick()
        }}
        data-testid="start-selling-button"
      >
        Get Started
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
