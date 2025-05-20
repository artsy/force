import MessageIcon from "@artsy/icons/MessageIcon"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import {
  Box,
  Clickable,
  Column,
  Flex,
  GridColumns,
  Image,
  Message,
  ResponsiveBox,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import type { Order2DetailsPage_order$key } from "__generated__/Order2DetailsPage_order.graphql"
import { graphql, useFragment } from "react-relay"
import { Order2DetailsHeader } from "./Order2DetailsHeader"
import { Order2DetailsMessage } from "./Order2DetailsMessage"

interface Order2DetailsPageProps {
  order: Order2DetailsPage_order$key
}

export const Order2DetailsPage = ({ order }: Order2DetailsPageProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <GridColumns>
      <Column span={[12]} backgroundColor="mono5">
        <Order2DetailsHeader order={orderData} />

        <Order2DetailsMessage order={orderData} />

        {/* Full Order Summary */}
        <Box p={2} backgroundColor="mono0">
          <Flex width="100%" justifyContent={"center"}>
            <ResponsiveBox
              bg="mono5"
              maxHeight={400}
              maxWidth={600}
              aspectWidth={1}
              aspectHeight={1}
            >
              <Image
                width="100%"
                height="100%"
                src="https://picsum.photos/seed/hello/700/400"
                srcSet="https://picsum.photos/seed/hello/700/400 1x, https://picsum.photos/seed/hello/1400/800 2x"
                alt="Hello world!"
                style={{ position: "relative", objectFit: "contain" }}
              />
            </ResponsiveBox>
          </Flex>
          <Spacer y={1} />
          <Box>
            <Text variant="sm">Marina Savashynskaya Dunbar</Text>
            <Text variant="sm" color="mono60">
              Wayfinding, 2023
            </Text>
            <Text variant="sm" color="mono60">
              List price: $15,000
            </Text>
          </Box>
          <Spacer y={2} />
          <Box>
            <Text variant="sm" color="mono60">
              Part of a limited edition set
            </Text>
            <Text variant="sm" color="mono60">
              9 2/5 x 11 4/5 in | 24 x 30 cm
            </Text>
          </Box>
          <Spacer y={2} />

          <Stack gap={0.5}>
            <Flex width="100%" justifyContent={"space-between"}>
              <Text variant="sm" color="mono60">
                Price
              </Text>
              <Text variant="sm" color="mono60">
                $15,000
              </Text>
            </Flex>
            <Flex width="100%" justifyContent={"space-between"}>
              <Text variant="sm" color="mono60">
                Shipping
              </Text>
              <Text variant="sm" color="mono60">
                $0
              </Text>
            </Flex>
            <Flex width="100%" justifyContent={"space-between"}>
              <Text variant="sm" fontWeight={500}>
                Total
              </Text>
              <Text variant="sm" fontWeight={500}>
                $15,100
              </Text>
            </Flex>
          </Stack>
          <Spacer y={2} />
          <Text variant="xs" color="mono60">
            *Additional duties and taxes may apply at import.
          </Text>
          <Spacer y={4} />
          <Message variant="default">
            <Flex>
              <ShieldIcon fill="mono100" />
              <Spacer x={1} />
              <Text variant="xs" color="mono100">
                Your purchase is protected with Artsy's buyer protection.
              </Text>
            </Flex>
          </Message>
        </Box>

        <Spacer y={1} />

        {/* Shipping/pickup info */}
        <Box p={2} backgroundColor="mono0">
          <Text variant="sm" fontWeight={500} color="mono100">
            Ship to
          </Text>
          <Text variant="xs" color="mono100">
            Viviana Flores <br />
            401 Broadway <br />
            New York, NY 10013 <br />
            United States <br />
            (212)456-7890
          </Text>
        </Box>

        <Spacer y={1} />

        {/* Payment method */}
        <Box p={2} backgroundColor="mono0">
          <Text variant="sm" fontWeight={500} color="mono100">
            Payment method
          </Text>
          <Spacer y={1} />
          <Flex>
            <BrandCreditCardIcon
              mr={1}
              type={"Visa" as Brand}
              width="26px"
              height="26px"
            />
            <Text variant="xs" color="mono100">
              •••• 4242 Exp 12/29
            </Text>
          </Flex>
        </Box>

        {/* Help section */}
        <Box p={2}>
          <Flex>
            <MessageIcon fill="mono100" />
            <Spacer x={1} />
            <Box>
              <Text variant="sm" color="mono100" fontWeight={500}>
                Need help?
              </Text>
              <Text variant="xs" color="mono100">
                <Clickable
                  data-test="help-center-link"
                  textDecoration="underline"
                  onClick={onClickReadFAQ}
                >
                  {" "}
                  Visit our help center
                </Clickable>{" "}
                or{" "}
                <Clickable
                  data-test="ask-question-link"
                  textDecoration="underline"
                  onClick={onClickAskSpecialist}
                >
                  ask a question
                </Clickable>
              </Text>
            </Box>
          </Flex>
        </Box>
      </Column>
    </GridColumns>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsPage_order on Order {
    ...Order2DetailsHeader_order
    ...Order2DetailsMessage_order
  }
`

const onClickReadFAQ = () => {
  // TODO: track event?
  window.open(
    "https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy",
    "_blank",
  )
}

const onClickAskSpecialist = () => {
  // TODO: track event?
  // What should it link to? On regular footer it's some inquiry question see StickyFooter.tsx
}
