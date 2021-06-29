import React from "react"
import { Flex, Text, Box } from "@artsy/palette"

export default function OfferStatus(props) {
  return (
    <Box>
      <Box>
        <Flex mb={3} flexDirection="column" justifyContent="center">
          <Flex justifyContent="center">
            <Flex
              mr={1}
              alignItems="center"
              justifyContent="center"
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: props.color,
                borderRadius: "50%",
              }}
            >
              <Text color="white" variant="small">
                $
              </Text>
            </Flex>
            <Text variant="mediumText" color={props.color}>
              Offer Accepted
            </Text>
          </Flex>
          <Box>
            <Text textAlign="center" variant="small" color={props.color}>
              Just Now
            </Text>
          </Box>
        </Flex>
      </Box>
      <Flex py={10} pl={22} pr={24} backgroundColor={props.color}>
        <Flex>
          <Flex
            mr={1}
            alignItems="center"
            justifyContent="center"
            style={{
              width: "18px",
              height: "18px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <Text color={props.color} variant="small">
              $
            </Text>
          </Flex>
          <Box color="white">
            <Text variant="mediumText">
              Counteroffer Received - Confirm Total
            </Text>
            <Text variant="small">The offer expires in 32hr</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
