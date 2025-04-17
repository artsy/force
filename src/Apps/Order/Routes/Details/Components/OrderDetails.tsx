import ShieldIcon from "@artsy/icons/ShieldIcon"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  Image,
  Join,
  Message,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

interface OrderDetailsProps {
  orderId: string
}

export const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  // const orderData = useFragment(ORDER_FRAGMENT, order)

  return (
    <GridColumns>
      <Column span={[12, 8]} start={[1, 3]}>
        {/* <Box bg="red">Order ID: {orderId}</Box> */}

        <Spacer y={2} />
        {/* Title */}
        <Text variant="lg">Great choice, Viviana! </Text>
        {/* Order # */}
        <Text variant="xs">Order #123456789 </Text>

        <Spacer y={4} />
        {/* Message */}
        <Join separator={<Spacer y={1} />}>
          <Text variant="sm">
            Your order has been confirmed. Thank you for your purchase.
          </Text>
          <Text variant="sm">
            You will be notified when the work has shipped, typically within 5-7
            business days.
          </Text>
          <Text variant="sm">
            You can contact the gallery with any questions about your order.
          </Text>
        </Join>

        <Spacer y={4} />
        {/* Full Order Summary */}
        <Box>
          <Flex width="100%" bg="black5" justifyContent={"center"}>
            <ResponsiveBox
              bg="black5"
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
            <Text variant="sm" color="black60">
              Wayfinding, 2023
            </Text>
            <Text variant="sm" color="black60">
              List price: $15,000
            </Text>
          </Box>
          <Spacer y={2} />
          <Box>
            <Text variant="sm" color="black60">
              Part of a limited edition set
            </Text>
            <Text variant="sm" color="black60">
              9 2/5 x 11 4/5 in | 24 x 30 cm
            </Text>
          </Box>
          <Spacer y={2} />
          <Join separator={<Spacer y={0.5} />}>
            <Flex width="100%" justifyContent={"space-between"}>
              <Text variant="sm" color="black60">
                Price
              </Text>
              <Text variant="sm" color="black60">
                $15,000
              </Text>
            </Flex>
            <Flex width="100%" justifyContent={"space-between"}>
              <Text variant="sm" color="black60">
                Shipping
              </Text>
              <Text variant="sm" color="black60">
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
          </Join>
          <Spacer y={4} />
          <Text variant="xs" color="black60">
            *Additional duties and taxes may apply at import.
          </Text>
          <Spacer y={4} />
          <Message variant="default">
            <Flex>
              <ShieldIcon fill="black100" />
              <Spacer x={1} />
              <Text variant="xs" color="black100">
                Your purchase is protected with Artsy’s buyer protection.
              </Text>
            </Flex>
          </Message>
        </Box>

        <Spacer y={2} />
        <Box p={1} my={2} bg="black5" mx={["-20px", 0]} />

        {/* Shipping/pickup info */}
        <Box>
          <Text variant="sm" fontWeight={500} color="black100">
            Ship to
          </Text>
          <Text variant="xs" color="black100">
            Viviana Flores <br />
            401 Broadway <br />
            New York, NY 10013 <br />
            United States <br />
            (212)456-7890
          </Text>
        </Box>

        <Spacer y={2} />
        <Box p={1} my={2} bg="black5" mx={["-20px", 0]} />

        {/* Payment method */}
        <Box>
          <Text variant="sm" fontWeight={500} color="black100">
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
            <Text variant="xs" color="black100">
              •••• 4242 Exp 12/29
            </Text>
          </Flex>
        </Box>
      </Column>
    </GridColumns>
  )
}
