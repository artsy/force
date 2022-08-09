import { FC } from "react"
import styled from "styled-components"
import { Flex, Spinner, Text } from "@artsy/palette"

export const ProcessingPayment: FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <SpinnerContainer>
        <Spinner size="large" color="blue100" />
      </SpinnerContainer>
      <Text variant="md" color="blue100">
        Processing payment
      </Text>
      <Text variant="sm" textColor="black60">
        Please do not close or refresh this window
      </Text>
    </Flex>
  )
}

const SpinnerContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
