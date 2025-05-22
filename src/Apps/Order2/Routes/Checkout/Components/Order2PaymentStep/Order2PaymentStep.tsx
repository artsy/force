import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import { Box, Clickable, Flex, Spacer, Text } from "@artsy/palette"
import { Order2PaymentForm } from "Apps/Order2/Routes/Checkout/Components/Order2PaymentStep/Order2PaymentForm"
import { Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type { Order2PaymentStep_order$key } from "__generated__/Order2PaymentStep_order.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { graphql, useFragment } from "react-relay"
import { Order2PaymentStepConfirmationTokenQuery } from "__generated__/Order2PaymentStepConfirmationTokenQuery.graphql"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { Order2PaymentCompletedView } from "Apps/Order2/Routes/Checkout/Components/Order2PaymentStep/Order2PaymentCompletedView"

interface Order2PaymentStepProps {
  order: Order2PaymentStep_order$key
}

export const Order2PaymentStep: React.FC<Order2PaymentStepProps> = ({
  order,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)

  const {
    editPayment,
    confirmationToken,
    steps,
    setConfirmationToken,
    setFulfillmentDetailsComplete,
  } = useCheckoutContext()!

  setFulfillmentDetailsComplete({ isPickup: false }) // Temporary just to open the payment step

  const stepState = steps?.find(
    step => step.name === CheckoutStepName.PAYMENT,
  )?.state

  return (
    console.log("====Order2PaymentStep", confirmationToken),
    (
      <Flex
        data-testid="PaymentStep"
        flexDirection="column"
        backgroundColor="mono0"
      >
        <Box hidden={stepState !== CheckoutStepState.COMPLETED}>
          <Order2PaymentCompletedView
            confirmationToken={confirmationToken}
            onClickEdit={() => editPayment()}
          />
        </Box>
        <Box p={2} hidden={stepState !== CheckoutStepState.ACTIVE}>
          <Flex flexDirection="column">
            <Text variant="sm-display" fontWeight={500} color="mono100">
              Payment
            </Text>
            <Text variant="xs" color="mono60">
              Options vary based on price, gallery, and location
            </Text>
            <Spacer y={2} />
            <Order2PaymentForm
              order={orderData}
              setConfirmationToken={setConfirmationToken}
            />
          </Flex>
        </Box>
      </Flex>
    )
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

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentStep_order on Order {
    internalID
    buyerTotal {
      minor
      currencyCode
    }
    itemsTotal {
      minor
      currencyCode
    }
    shippingTotal {
      minor
    }
    taxTotal {
      minor
    }
    seller {
      __typename
      ... on Partner {
        merchantAccount {
          externalId
        }
      }
    }
  }
`
