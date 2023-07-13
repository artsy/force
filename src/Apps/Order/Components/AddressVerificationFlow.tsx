import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { AddressVerificationFlowQuery } from "__generated__/AddressVerificationFlowQuery.graphql"
import { AddressVerificationFlow_verifiedAddressResult$data } from "__generated__/AddressVerificationFlow_verifiedAddressResult.graphql"

interface AddressVerificationFlowProps {
  verifiedAddressResult: AddressVerificationFlow_verifiedAddressResult$data
  onChosenAddress: (address: AddressValues) => void
}

interface AddressValues {
  addressLine1: string
  addressLine2?: string
  country: string
  city: string
  region: string
  postalCode: string
}

const AddressVerificationFlow: React.FC<AddressVerificationFlowProps> = ({
  verifiedAddressResult,
  onChosenAddress,
}) => {
  return <pre>{JSON.stringify(verifiedAddressResult, null, 2)}</pre>
}

const AddressVerificationFlowFragmentContainer = createFragmentContainer(
  AddressVerificationFlow,
  {
    verifiedAddressResult: graphql`
      fragment AddressVerificationFlow_verifiedAddressResult on VerifyAddressType {
        inputAddress {
          lines
          address {
            addressLine1
            addressLine2
            city
            country
            postalCode
            region
          }
        }
        suggestedAddresses {
          lines
          address {
            addressLine1
            addressLine2
            city
            country
            postalCode
            region
          }
        }
        verificationStatus
      }
    `,
  }
)

export const AddressVerificationFlowQueryRenderer: React.FC<{
  address: AddressValues
  onChosenAddress: (address: AddressValues) => void
}> = ({ address, onChosenAddress }) => {
  return (
    <SystemQueryRenderer<AddressVerificationFlowQuery>
      variables={{ address }}
      placeholder={<div>... loading ... </div>}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.verifyAddress) {
          return <div>... loading ... </div>
        }

        return (
          <AddressVerificationFlowFragmentContainer
            verifiedAddressResult={props.verifyAddress}
            onChosenAddress={onChosenAddress}
          />
        )
      }}
      query={graphql`
        query AddressVerificationFlowQuery($address: AddressInput!) {
          verifyAddress(address: $address) {
            ...AddressVerificationFlow_verifiedAddressResult
          }
        }
      `}
    />
  )
}
