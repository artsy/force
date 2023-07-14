import { Button, Text } from "@artsy/palette"
import {
  AddressValues,
  AddressVerificationFlowQueryRenderer,
} from "Apps/Order/Components/AddressVerificationFlow"
import * as React from "react"
import { Title } from "react-head"

export const DebugApp: React.FC<{}> = () => {
  return (
    <>
      <Title>Baseline</Title>

      <Text variant="sm-display">Baseline</Text>
      {/* TODO: REMOVE THIS BEFORE MERGE */}
      <TempModalWrapper />
    </>
  )
}

/* TODO: REMOVE THIS BEFORE MERGE */
const TempModalWrapper = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [address, setAddress] = React.useState<AddressValues | null>(null)
  React.useEffect(() => {
    if (address) {
      setShowModal(true)
    }
  }, [address])
  return (
    <>
      <Button
        onClick={() => {
          setAddress({
            addressLine1: "an d. waldlust 15",
            city: "oberursel",
            country: "DE",
            postalCode: "61440",
            region: "Hessen",
          })
        }}
      >
        {address ? "clear address" : "trigger verification"}
      </Button>
      {showModal && (
        <AddressVerificationFlowQueryRenderer
          address={address!}
          onClose={() => setShowModal(false)}
          onChosenAddress={chosen => {
            alert(JSON.stringify(chosen, null, 2))
            setShowModal(false)
          }}
        />
      )}
    </>
  )
}
