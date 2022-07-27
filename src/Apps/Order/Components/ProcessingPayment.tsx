import { FC } from "react"
import styled from "styled-components"
import { Flex, Spinner, Text } from "@artsy/palette"

export const ProcessingPayment: FC = () => (
  <Flex
    style={{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "auto",
      minHeight: "300px",
    }}
  >
    <Text variant="md" color="blue100">
      Processing payment
    </Text>
    <Text variant="sm" textColor="black60">
      Please do not close or refresh this window
    </Text>
    <SpinnerContainer>
      <Spinner size="large" />
    </SpinnerContainer>
  </Flex>
)

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
