import { Box, Clickable, HTML, Tab, Tabs, Text, useTheme } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { AuctionFAQsDialog_viewer$data } from "__generated__/AuctionFAQsDialog_viewer.graphql"
import CloseIcon from "@artsy/icons/CloseIcon"

interface AuctionFAQsDialogProps {
  onClose(): void
  viewer: AuctionFAQsDialog_viewer$data
}

const AuctionFAQsDialog: React.FC<AuctionFAQsDialogProps> = ({
  onClose,
  viewer,
}) => {
  const { theme } = useTheme()
  return (
    <Box
      bg="white100"
      p={2}
      position="relative"
      width={800}
      height={600}
      overflowY="auto"
      style={{
        boxShadow: theme.effects.dropShadow,
        WebkitOverflowScrolling: "auto",
      }}
    >
      <Clickable
        position="absolute"
        right={0}
        top={0}
        pt={2}
        px={1}
        mx={0.5}
        onClick={onClose}
        aria-label="Close"
      >
        <CloseIcon fill="black100" display="block" />
      </Clickable>

      <Text variant="xl" mb={2}>
        Auction FAQs
      </Text>

      <Text variant="sm" mb={2}>
        How can we help you? Below are a few general categories to help you find
        the answers you’re looking for. Need more immediate assistance? Please{" "}
        <RouterLink inline to="mailto:specialist@artsy.net">
          contact us
        </RouterLink>
        .
      </Text>

      <Tabs>
        {Object.keys(viewer).map(
          (key: keyof Omit<typeof viewer, " $refType">) => {
            const page = viewer[key] as any

            if (!page.content) return null

            const name = page.name.replace("How Auctions Work: ", "")

            return (
              <Tab key={key} name={name}>
                <HTML variant="sm" html={page.content} />
              </Tab>
            )
          }
        )}
      </Tabs>
    </Box>
  )
}

export const AuctionFAQsDialogFragmentContainer = createFragmentContainer(
  AuctionFAQsDialog,
  {
    viewer: graphql`
      fragment AuctionFAQsDialog_viewer on Viewer {
        bidding: page(id: "how-auctions-work-bidding") {
          name
          content(format: HTML)
        }
        buyersPremium: page(
          id: "how-auctions-work-buyers-premium-taxes-and-fees"
        ) {
          name
          content(format: HTML)
        }
        paymentsAndShipping: page(
          id: "how-auctions-work-payments-and-shipping"
        ) {
          name
          content(format: HTML)
        }
        emailsAndAlerts: page(id: "how-auctions-work-emails-and-alerts") {
          name
          content(format: HTML)
        }
        conditionsOfSale: page(id: "how-auctions-work-conditions-of-sale") {
          name
          content(format: HTML)
        }
      }
    `,
  }
)
