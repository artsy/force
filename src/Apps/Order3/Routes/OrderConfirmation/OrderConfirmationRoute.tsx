import {
  Box,
  Column,
  Flex,
  GridColumns,
  Image,
  Separator,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"

// Using the same artwork image from the Figma design
const artworkImageUrl =
  "http://localhost:3845/assets/87c9f9ceb0d1c183bec3e347127adab3d3ee2109.png"

export const OrderConfirmationRoute: React.FC = () => {
  return (
    <Box bg="mono5" minHeight="100vh" py={4}>
      <Box maxWidth={1440} mx="auto" px={4}>
        <GridColumns>
          <Column span={8}>
            {/* Main Content */}
            <Box bg="mono0" p={4} mb={2}>
              <Box mb={4}>
                <Text variant="xl" mb={1}>
                  Great choice!
                </Text>
                <Text variant="sm">Order #123456789</Text>
              </Box>

              <Box mb={4}>
                <Text variant="sm" mb={2}>
                  Thank you! Your order is being processed. You will receive an
                  email shortly with all the details.
                </Text>
                <Text variant="sm" mb={2}>
                  The gallery will confirm by{" "}
                  <Text fontWeight="medium">Feb 21, 2:46 PM EDT.</Text>
                </Text>
                <Text variant="sm">
                  You can{" "}
                  <RouterLink inline textDecoration="underline" to="#">
                    contact the gallery
                  </RouterLink>{" "}
                  with any questions about your order.
                </Text>
              </Box>
            </Box>

            {/* Shipping Info */}
            <Box bg="mono0" p={4} mb={1}>
              <Text variant="sm" fontWeight="medium" mb={1}>
                Ship to
              </Text>
              <Text variant="sm">
                Viviana Flores
                <br />
                401 Broadway
                <br />
                New York, NY 10013
                <br />
                United States
                <br />
                (212) 456-7890
              </Text>
            </Box>

            <Box bg="mono5" height="10px" />

            {/* Payment Method */}
            <Box bg="mono0" p={4}>
              <Text variant="sm" fontWeight="medium" mb={1}>
                Payment method
              </Text>
              <Flex alignItems="center" gap={1}>
                {/* Credit card icon placeholder */}
                <Box
                  width="18px"
                  height="18px"
                  bg="blue100"
                  borderRadius="2px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text variant="xxs" color="mono0">
                    V
                  </Text>
                </Box>
                <Text variant="sm">•••• 4242 Exp 12/29</Text>
              </Flex>
            </Box>
          </Column>

          <Column span={4}>
            {/* Order Summary */}
            <Box bg="mono0" p={4}>
              {/* Artwork Image */}
              <Box
                mb={2}
                height="380px"
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={artworkImageUrl}
                  alt="Marina Savashynskaya Dunbar - Wayfinding, 2023"
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              </Box>

              {/* Artwork Details */}
              <Box mb={2}>
                <Text variant="sm" mb={0.5}>
                  Marina Savashynskaya Dunbar
                </Text>
                <Text variant="sm" color="mono60" mb={0.5}>
                  Wayfinding, 2023
                </Text>
                <Text variant="sm" color="mono60" mb={0.5}>
                  Octavia Art Gallery
                </Text>
                <Text variant="sm" color="mono60" mb={1}>
                  List price: $15,000
                </Text>
                <Text variant="sm" color="mono60" mb={0.5}>
                  Part of a limited edition set
                </Text>
                <Text variant="sm" color="mono60" mb={2}>
                  9 2/5 x 11 4/5 in | 24 x 30 cm
                </Text>
              </Box>

              {/* Price Breakdown */}
              <Box py={2}>
                <Flex justifyContent="space-between" mb={1}>
                  <Text variant="sm" color="mono60">
                    Price
                  </Text>
                  <Text variant="sm" color="mono60">
                    $15,000
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" mb={1}>
                  <Text variant="sm" color="mono60">
                    Standard shipping
                  </Text>
                  <Text variant="sm" color="mono60">
                    $0
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" mb={2}>
                  <Text variant="sm" color="mono60">
                    Tax*
                  </Text>
                  <Text variant="sm" color="mono60">
                    $100
                  </Text>
                </Flex>

                <Separator mb={2} />

                <Flex justifyContent="space-between" mb={3}>
                  <Text variant="sm" fontWeight="medium">
                    Total
                  </Text>
                  <Text variant="sm" fontWeight="medium">
                    US$15,100
                  </Text>
                </Flex>

                <Text variant="xs" color="mono60" mb={3}>
                  *Additional duties and taxes{" "}
                  <RouterLink inline textDecoration="underline" to="#">
                    may apply at import
                  </RouterLink>
                  .
                </Text>
              </Box>

              {/* Buyer Protection */}
              <Box bg="mono5" p={2}>
                <Flex alignItems="flex-start" gap={1}>
                  {/* Shield icon placeholder */}
                  <Box
                    width="18px"
                    height="18px"
                    bg="mono60"
                    mt={0.5}
                    borderRadius="2px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text variant="xxs" color="mono0">
                      🛡
                    </Text>
                  </Box>
                  <Text variant="xs">
                    Your purchase is protected with{" "}
                    <RouterLink
                      inline
                      textDecoration="underline"
                      to="/buyer-guarantee"
                    >
                      Artsy's Buyer Guarantee
                    </RouterLink>
                    .
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* Help Section */}
            <Box
              bg="mono0"
              p={4}
              mt={2}
              borderTop="1px solid"
              borderColor="mono15"
            >
              <Flex alignItems="flex-start" gap={1} mb={1}>
                {/* Message icon placeholder */}
                <Box
                  width="18px"
                  height="18px"
                  bg="mono60"
                  borderRadius="2px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text variant="xxs" color="mono0">
                    ?
                  </Text>
                </Box>
                <Text variant="sm" fontWeight="medium">
                  Need help?
                </Text>
              </Flex>
              <Box pl="23px">
                <Text variant="xs" color="mono60">
                  <RouterLink inline textDecoration="underline" to="#">
                    Visit our help center
                  </RouterLink>{" "}
                  or{" "}
                  <RouterLink inline textDecoration="underline" to="#">
                    ask a question
                  </RouterLink>
                  .
                </Text>
              </Box>
            </Box>
          </Column>
        </GridColumns>
      </Box>
    </Box>
  )
}
