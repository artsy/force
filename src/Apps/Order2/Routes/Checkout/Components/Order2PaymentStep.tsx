import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { Order2PaymentForm } from "Apps/Order2/Routes/Checkout/Components/Order2PaymentForm"
import { Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type { Order2PaymentForm_order$key } from "__generated__/Order2PaymentForm_order.graphql"
import { useState } from "react"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { graphql } from "react-relay"
import { Order2PaymentStepConfirmationTokenQuery } from "__generated__/Order2PaymentStepConfirmationTokenQuery.graphql"

interface Order2PaymentStepProps {
  order: Order2PaymentForm_order$key
}

export const Order2PaymentStep: React.FC<Order2PaymentStepProps> = ({
  order,
}) => {
  // Temporarily using a local state until we have a global checkout context
  const [confirmationTokenID, setConfirmationTokenID] = useState<string | null>(
    null,
  )
  const paymentStepComplete = !!confirmationTokenID

  return (
    <>
      {!paymentStepComplete && (
        <Flex flexDirection="column" backgroundColor="mono0" p={2}>
          <Text variant="sm-display" fontWeight={500} color="mono100">
            Payment
          </Text>
          <Text variant="xs" color="mono60">
            Options vary based on price, gallery, and location
          </Text>
          <Spacer y={2} />
          <Order2PaymentForm
            setConfirmationTokenID={setConfirmationTokenID}
            order={order}
          />
        </Flex>
      )}

      {paymentStepComplete && (
        <MeConfirmationTokenQueryRenderer
          tokenID={confirmationTokenID}
          setConfirmationTokenID={setConfirmationTokenID}
        />
      )}
    </>
  )
}

interface MeConfirmationTokenQueryRendererProps {
  tokenID: string
  setConfirmationTokenID: (id: string | null) => void
}

export const MeConfirmationTokenQueryRenderer: React.FC<
  MeConfirmationTokenQueryRendererProps
> = ({ tokenID, setConfirmationTokenID }) => {
  return (
    <SystemQueryRenderer<Order2PaymentStepConfirmationTokenQuery>
      query={graphql`
        query Order2PaymentStepConfirmationTokenQuery($tokenID: String!) {
          me {
            confirmationToken(id: $tokenID) {
              paymentMethodPreview {
                card {
                  displayBrand
                  last4
                }
              }
            }
          }
        }
      `}
      variables={{ tokenID }}
      render={({ props }) => {
        if (
          props?.me?.confirmationToken?.paymentMethodPreview?.card?.displayBrand
        ) {
          return (
            <Flex flexDirection="column" backgroundColor="mono0" p={2}>
              <Flex justifyContent="space-between">
                <Flex alignItems="center">
                  <CheckmarkIcon fill="mono100" />
                  <Spacer x={1} />
                  <Text variant="sm-display" fontWeight={500} color="mono100">
                    Payment
                  </Text>
                </Flex>
                <Clickable
                  textDecoration="underline"
                  cursor="pointer"
                  type="button"
                  onClick={() => setConfirmationTokenID(null)}
                >
                  Edit
                </Clickable>
              </Flex>
              <Flex alignItems="center" ml="30px" mt={1}>
                <BrandCreditCardIcon
                  mr={1}
                  type={
                    props?.me?.confirmationToken?.paymentMethodPreview?.card
                      ?.displayBrand as Brand
                  }
                  width="26px"
                  height="26px"
                />
                <Text variant="sm-display">
                  ••••{" "}
                  {
                    props?.me?.confirmationToken?.paymentMethodPreview?.card
                      ?.last4
                  }
                </Text>
              </Flex>
            </Flex>
          )
        }
        return null
      }}
    />
  )
}
