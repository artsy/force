import {
  Box,
  Clickable,
  ModalBase,
  Separator,
  Spinner,
  Text,
  useTheme,
} from "@artsy/palette"
import { compact } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { AuctionBuyersPremiumDialogQuery } from "__generated__/AuctionBuyersPremiumDialogQuery.graphql"
import { AuctionBuyersPremiumDialog_sale$data } from "__generated__/AuctionBuyersPremiumDialog_sale.graphql"
import CloseIcon from "@artsy/icons/CloseIcon"

interface AuctionBuyersPremiumDialogProps {
  onClose(): void
  sale: AuctionBuyersPremiumDialog_sale$data
}

const AuctionBuyersPremiumDialog: React.FC<AuctionBuyersPremiumDialogProps> = ({
  onClose,
  sale,
}) => {
  const schedule = compact(sale.buyersPremium).sort(
    (a, b) => (a.cents ?? 0) - (b.cents ?? 0)
  )

  const { theme } = useTheme()

  return (
    <Box
      bg="white100"
      p={2}
      position="relative"
      width={550}
      height="100%"
      style={{ boxShadow: theme.effects.dropShadow }}
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

      <Text variant="lg-display" mb={1}>
        What is a Buyer’s Premium?
      </Text>

      <Text variant="sm">
        A buyer’s premium is a charge the winning bidder pays in addition to the
        lot’s hammer price. It is calculated as a percentage of the hammer
        price, at the rates indicated below. If a lot has a buyer’s premium,
        this will be indicated on the bidding screen where you place your bid.
        After the auction, the winning bidder will receive a summary of their
        purchase, including the hammer price and buyer’s premium, along with any
        applicable taxes.
      </Text>

      {schedule.length > 0 && (
        <>
          <Separator my={1} />

          <Text variant="lg-display" mb={1}>
            Buyer’s Premium For This Auction on Artsy
          </Text>

          {schedule.length === 1 ? (
            <Text variant="sm">
              {(schedule[0].percent ?? 0) * 100}% on the hammer price
            </Text>
          ) : (
            schedule.map((premium, i) => {
              const percent = (premium.percent ?? 0) * 100
              const hasDecimal = percent - Math.floor(percent) !== 0
              const fixed = percent.toFixed(1)
              const displayPercentage = hasDecimal ? fixed : percent
              // First
              if (i === 0) {
                return (
                  <Text key={i} variant="sm" mb={0.5}>
                    On the hammer price up to and including{" "}
                    {schedule[i + 1]?.amount}: {displayPercentage}%
                  </Text>
                )
              }

              // Last
              if (i === schedule.length - 1) {
                return (
                  <Text key={i} variant="sm">
                    On the portion of the hammer price in excess of{" "}
                    {premium?.amount}: {displayPercentage}%
                  </Text>
                )
              }

              return (
                <Text key={i} variant="sm" mb={0.5}>
                  On the hammer price in excess of {premium.amount} up to and
                  including {schedule[i + 1].amount}: {displayPercentage}%
                </Text>
              )
            })
          )}
        </>
      )}
    </Box>
  )
}

export const AuctionBuyersPremiumDialogFragmentContainer = createFragmentContainer(
  AuctionBuyersPremiumDialog,
  {
    sale: graphql`
      fragment AuctionBuyersPremiumDialog_sale on Sale {
        buyersPremium {
          amount
          cents
          percent
        }
      }
    `,
  }
)

interface AuctionBuyersPremiumDialogQueryRendererProps {
  onClose(): void
  saleID: string
}

export const AuctionBuyersPremiumDialogQueryRenderer: React.FC<AuctionBuyersPremiumDialogQueryRendererProps> = ({
  onClose,
  saleID,
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <ModalBase bg="rgba(0,0,0,0.8)" onClose={onClose}>
      <SystemQueryRenderer<AuctionBuyersPremiumDialogQuery>
        environment={relayEnvironment}
        placeholder={<Spinner color="white100" />}
        variables={{ saleID }}
        query={graphql`
          query AuctionBuyersPremiumDialogQuery($saleID: String!) {
            sale(id: $saleID) {
              ...AuctionBuyersPremiumDialog_sale
            }
          }
        `}
        render={({ props, error }) => {
          if (!props) {
            return <Spinner color="white100" />
          }

          if (error ?? !props.sale) {
            onClose()
            return
          }

          return (
            <AuctionBuyersPremiumDialogFragmentContainer
              onClose={onClose}
              sale={props.sale}
            />
          )
        }}
      />
    </ModalBase>
  )
}
