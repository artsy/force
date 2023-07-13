import {
  ModalDialog,
  Spacer,
  Box,
  Flex,
  Button,
  RadioGroup,
  BorderedRadio,
  Text,
} from "@artsy/palette"
import { useSystemContext } from "System/SystemContext"
import { FC, useState, useEffect } from "react"
import { fetchQuery, Environment, graphql } from "react-relay"
import {
  AddressVerificationManagerQuery,
  AddressVerificationManagerQuery$data,
} from "__generated__/AddressVerificationManagerQuery.graphql"

type PresentVerificationPayload = NonNullable<
  AddressVerificationManagerQuery$data["verifyAddress"]
>
type SuggestedAddresses = PresentVerificationPayload["suggestedAddresses"]

type InputAddress = PresentVerificationPayload["inputAddress"]

interface VerifiableAddress {
  addressLine1: string
  addressLine2?: string
  country: string
  city: string
  region: string
  postalCode: string
}

type IncomingAddressValues = VerifiableAddress & {
  [key: string]: unknown
}

type AddressOption = {
  address: VerifiableAddress
  lines: string[]
  recommended: boolean
  key: string
}

enum ErrorModalTitle {
  general = "Check your delivery address",
  suggested = "Confirm your delivery address",
}

enum AddressSuggestionRadioButton {
  recommended = "Recommended",
  user_address = "What you entered",
}

export const AddressVerificationManager: FC<{
  render: React.FC<{
    verifyAddress: (address: VerifiableAddress) => React.ReactNode
    resetModal: () => void
  }>
}> = ({ render }) => {
  const [displayModal, setDisplayModal] = useState(false)

  // TODO: maybe we can deduce this by presence of suggestions
  const [modalTitle, setModalTitle] = useState<ErrorModalTitle>(
    ErrorModalTitle.general
  )
  const [verificationResult, setVerificationResult] = useState<
    AddressVerificationManagerQuery$data["verifyAddress"]
  >(null)

  const [selectedAddressKey, setSelectedAddressKey] = useState<
    AddressOption["key"]
  >(AddressSuggestionRadioButton.recommended)

  const [resolveAddress, setResolveAddress] = useState<
    null | ((chosen: VerifiableAddress) => void)
  >(null)

  // after receiving verification result, display modal
  useEffect(() => {
    // check logic for presence
    if (verificationResult) {
      setDisplayModal(true)
    }
  }, [verificationResult])

  // reset modal state, including verification result
  const resetModal = () => {
    setDisplayModal(false)
    setVerificationResult(null)
  }

  const handleEditAddressClick = () => {
    // track clicked edit address
    resetModal()
  }

  const handleCloseClick = () => {
    // track closed modal
    resetModal()
  }

  const handleKeepAddressClick = () => {
    const chosenAddress = verificationResult?.inputAddress
      ?.address as VerifiableAddress
    // TODO: Is our MP schema wrong to say region is nullable? Using VerifiableAddress for now
    // ?.address as NonNullable<NonNullable<InputAddress>["address"]>

    if (chosenAddress && resolveAddress) {
      resolveAddress(chosenAddress)
      // reset modal? maybe not
    }
  }

  const handleUseSelectedAddressClick = () => {
    // find selected address
    const selectedAddress = addressOptions.find(
      option => option.key === selectedAddressKey
    )

    resolveAddress?.(selectedAddress?.address as VerifiableAddress)
    // resolve address
  }

  const { verifyAddressQuery } = useVerifyAddressQuery()

  const verifyAddress = async (addressValues: IncomingAddressValues) => {
    const {
      addressLine1,
      addressLine2,
      postalCode,
      city,
      region,
      country,
      ...otherValues
    } = addressValues

    const incomingAddressValues = {
      addressLine1,
      addressLine2,
      postalCode,
      city,
      region,
      country,
    }

    // this will be passed back to the render prop and
    // resolved when the verification flow completes
    const awaitFinalAddress = new Promise<IncomingAddressValues>(resolve => {
      setResolveAddress((chosen: VerifiableAddress) =>
        resolve({ ...chosen, ...otherValues } as IncomingAddressValues)
      )
    })

    const response = await verifyAddressQuery(incomingAddressValues)

    if (!response) {
      console.warn("No response from address verification query")
    } else {
      console.log({ response })

      setVerificationResult(response.verifyAddress)

      // TODO: is verificationResult guaranteed to have been set (from the line above) by now?
      // answer: i don't think so. we have to use useEffect hooks to watch for changes :(
      const status = response.verifyAddress?.verificationStatus

      if (status === "VERIFIED_NO_CHANGE") {
        // TODO: update order and proceed to payment step
        // resolveAddress(inputAddress.address as InputAddress)
        resolveAddress?.(incomingAddressValues as VerifiableAddress)
      } else if (status === "VERIFIED_WITH_CHANGES") {
        // suggestedAddresses is > 0
        setModalTitle(ErrorModalTitle.suggested)
        // TODO: Type improvements
        setDisplayModal(true)
      } else {
        // setInputAddressLines(response.verifyAddress.inputAddress.lines)
        setModalTitle(ErrorModalTitle.general)
        setDisplayModal(true)
      }
    }

    // await user address selection
    return awaitFinalAddress
  }
  // TODO: if displayModal is set to `true` then verificationResult
  // should be guaranteed to exist
  // ALSO, will verificationResult be set by this point, or do we need
  // to wait/use the response payload?
  const inputAddress = verificationResult?.inputAddress as InputAddress
  const suggestedAddresses = (verificationResult?.suggestedAddresses ||
    []) as SuggestedAddresses

  // TODO: should this be a state variable?
  let addressOptions: AddressOption[] = []

  if (Array.isArray(suggestedAddresses) && suggestedAddresses.length > 0) {
    const visibleSuggestedAddresses = suggestedAddresses
      ?.slice(0, 1)
      .map((candidate, index) => ({
        ...candidate,
        key: `suggestedAddress-${index}`,
        recommended: index === 0,
      }))

    addressOptions = [
      ...visibleSuggestedAddresses,
      { ...inputAddress, key: "userAddress", recommended: false },
    ]
  }

  return (
    <>
      {render({ verifyAddress, resetModal })}
      {/* TODO: at this point if we have a response (displayModal is true),
          then inputAddress and inputAddress.lines should be present
      */}
      {displayModal && inputAddress?.lines?.length && (
        <ModalDialog
          title={modalTitle}
          onClose={handleCloseClick}
          width={["100%", 550]}
        >
          {modalTitle === ErrorModalTitle.general && (
            <>
              <Text>
                The address you entered may be incorrect or incomplete. Please
                check it and make any changes necessary.
              </Text>
              <Spacer y={4} />
              <Text fontWeight="bold">What you entered</Text>
              <Spacer y={1} />
              <Box border="1px solid" borderColor="black30" p={2}>
                {inputAddress.lines!.map((line: string) => (
                  <Text key={line}>{line}</Text>
                ))}
              </Box>
              <Spacer y={4} />
              <Flex width="100%" justifyContent="space-between">
                <Button
                  onClick={handleKeepAddressClick}
                  variant="secondaryBlack"
                  flex={1}
                >
                  Use This Address
                </Button>
                <Spacer x={1} />
                <Button onClick={handleEditAddressClick} flex={1}>
                  Edit Address
                </Button>
              </Flex>
            </>
          )}

          {modalTitle === ErrorModalTitle.suggested &&
            // TODO: This is implicitly true if we set the modal title to suggested
            addressOptions.length > 0 && (
              <>
                <Text>
                  To ensure prompt and accurate delivery, we suggest a modified
                  shipping address.
                </Text>
                <Spacer y={2} />
                <RadioGroup
                  onSelect={(selected: AddressOption["key"]) =>
                    setSelectedAddressKey(selected)
                  }
                  defaultValue={selectedAddressKey}
                >
                  {addressOptions.map(
                    ({ key, recommended, ...addressOption }, index) =>
                      addressOption.lines && (
                        <BorderedRadio
                          key={key}
                          value={key}
                          label={
                            recommended
                              ? AddressSuggestionRadioButton.recommended
                              : AddressSuggestionRadioButton.user_address
                          }
                        >
                          <Flex flexDirection="column">
                            {addressOption.lines.map((line: string) => (
                              <Text variant="xs" key={line}>
                                {line}
                              </Text>
                            ))}
                          </Flex>
                        </BorderedRadio>
                      )
                  )}
                </RadioGroup>
                <Spacer y={4} />
                <Flex width="100%" justifyContent="space-between">
                  <Button
                    onClick={handleEditAddressClick}
                    variant="secondaryBlack"
                    flex={1}
                  >
                    Back to Edit
                  </Button>
                  <Spacer x={1} />
                  <Button onClick={handleUseSelectedAddressClick} flex={1}>
                    Use This Address
                  </Button>
                </Flex>
              </>
            )}
        </ModalDialog>
      )}
    </>
  )
}

const useVerifyAddressQuery = () => {
  const { relayEnvironment } = useSystemContext()
  const verifyAddressQuery = <T extends VerifiableAddress>(address: T) =>
    fetchQuery<AddressVerificationManagerQuery>(
      relayEnvironment as Environment,
      graphql`
        query AddressVerificationManagerQuery($address: AddressInput!) {
          verifyAddress(address: $address) {
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
        }
      `,
      {
        address,
      }
    ).toPromise()

  return { verifyAddressQuery }
}
