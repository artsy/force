import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { CreditCardDetails } from "../CreditCardDetails"

const creditCard = {
  brand: "Visa",
  lastDigits: "4444",
  expirationMonth: 3,
  expirationYear: 21,
}

storiesOf("Apps/Order/Components", module).add("Credit card details", () => (
  <Section title="Credit card details">
    <Flex flexDirection="column" width={300} mb={2}>
      <CreditCardDetails {...creditCard} brand="Visa" />
    </Flex>
    <Flex flexDirection="column" width={300} mb={2}>
      <CreditCardDetails {...creditCard} brand="MasterCard" />
    </Flex>
    <Flex flexDirection="column" width={300} mb={2}>
      <CreditCardDetails {...creditCard} brand="Discover" />
    </Flex>
    <Flex flexDirection="column" width={300} mb={2}>
      <CreditCardDetails {...creditCard} brand="American Express" />
    </Flex>
    <Flex flexDirection="column" width={300}>
      <CreditCardDetails {...creditCard} brand="unknown" />
    </Flex>
  </Section>
))
