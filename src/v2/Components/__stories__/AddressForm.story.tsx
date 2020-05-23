import { Flex } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { Address, AddressForm } from "../AddressForm"

class TypicalAddressForm extends React.Component<
  {
    address?: Address
    billing?: boolean
    domesticOnly?: boolean
    euOrigin?: boolean
    shippingCountry?: string
  },
  Address
  > {
  constructor(props) {
    super(props)
    this.state = props.address || {}
  }

  onChange = address => {
    this.setState(address)
  }

  render() {
    return (
      <AddressForm
        value={this.state}
        onChange={this.onChange}
        errors={{}}
        touched={{}}
        billing={this.props.billing}
        domesticOnly={this.props.domesticOnly}
        euOrigin={this.props.euOrigin}
        shippingCountry={this.props.shippingCountry}
      />
    )
  }
}

storiesOf("Components/AddressForm", module)
  .add("Blank", () => {
    return (
      <Section>
        <Flex flexDirection="column">
          <TypicalAddressForm />
        </Flex>
      </Section>
    )
  })
  .add("Blank DomesticOnly", () => {
    return (
      <Section>
        <Flex flexDirection="column">
          <TypicalAddressForm shippingCountry="US" domesticOnly />
        </Flex>
      </Section>
    )
  })
  .add("Blank DomesticEUOnly", () => {
    return (
      <Section>
        <Flex flexDirection="column">
          <TypicalAddressForm shippingCountry="DE" domesticOnly euOrigin />
        </Flex>
      </Section>
    )
  })
  .add("Filled out", () => {
    return (
      <Section>
        <Flex flexDirection="column">
          <TypicalAddressForm
            address={{
              name: "Joelle Van Dyne",
              country: "US",
              postalCode: "10013",
              addressLine1: "401 Broadway",
              addressLine2: "Suite 25",
              city: "New York",
              region: "NY",
              phoneNumber: "120938120983",
            }}
          />
        </Flex>
      </Section>
    )
  })
