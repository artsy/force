import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { AddressVerificationFlowQuery } from "__generated__/AddressVerificationFlowQuery.graphql"
import { AddressVerificationFlow_verifiedAddressResult$data } from "__generated__/AddressVerificationFlow_verifiedAddressResult.graphql"
import {
  BorderedRadio,
  Box,
  Button,
  Flex,
  ModalDialog,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { useCallback, useEffect, useState } from "react"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/SystemContext"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { Address } from "Components/AddressForm"

interface AddressVerificationFlowProps {
  verifiedAddressResult: AddressVerificationFlow_verifiedAddressResult$data
  onChosenAddress: (address: AddressValues, saveAndContinue: boolean) => void
  onClose: () => void
}

export interface AddressValues {
  addressLine1: string
  addressLine2?: string
  country: string
  city: string
  region: string
  postalCode: string
}

enum ModalType {
  SUGGESTIONS = "suggestions",
  REVIEW_AND_CONFIRM = "review_and_confirm",
}

interface AddressOption {
  key: string
  recommended: boolean
  lines: string[]
  address: AddressValues
}

enum AddressSuggestionRadioButton {
  recommended = "Recommended",
  user_address = "What you entered",
}

const formValues = (address: Address) => {
  return {
    address: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
    },
  }
}

const AddressVerificationFlow: React.FC<AddressVerificationFlowProps> = ({
  verifiedAddressResult,
  onChosenAddress,
  onClose,
}) => {
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [addressOptions, setAddressOptions] = useState<AddressOption[]>([])
  const [selectedAddressKey, setSelectedAddressKey2] = useState<string | null>(
    null
  )

  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const { contextPageOwnerSlug } = useAnalyticsContext()

  const setSelectedAddressKey = (key: string) => {
    setSelectedAddressKey2(key)
  }

  const chooseAddress = useCallback(() => {
    if (!selectedAddressKey) return

    const selectedAddress = addressOptions.find(
      option => option.key === selectedAddressKey
    )
    if (selectedAddress) {
      setModalType(null)
      onChosenAddress(selectedAddress.address, false)
    }
  }, [addressOptions, onChosenAddress, selectedAddressKey])

  const handleClose = () => {
    trackEvent({
      action_type: "clickedCloseValidationAddress",
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: OwnerType.ordersShipping,
      context_page_owner_id: contextPageOwnerSlug,
      option: null,
      label: null,
    })
    onClose()
  }

  const handleBackToEdit = () => {
    const option =
      selectedAddressKey === "suggestedAddress"
        ? "Recommended"
        : selectedAddressKey === "userAddress"
        ? "What you entered"
        : null

    trackEvent({
      action_type: "clickedValidationAddress",
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: OwnerType.ordersShipping,
      context_page_owner_id: contextPageOwnerSlug,
      user_id: user?.id,
      subject: "Check your delivery address",
      option,
      label: "Back to Edit",
    })
    onClose()
  }

  const handleEditAddress = () => {
    trackEvent({
      action_type: "clickedValidationAddress",
      context_module: ContextModule.ordersShipping,
      context_page_owner_type: OwnerType.ordersShipping,
      context_page_owner_id: contextPageOwnerSlug,
      user_id: user?.id,
      subject: "Check your delivery address",
      label: "Edit Address",
    })
    onClose()
  }

  useEffect(() => {
    if (addressOptions.length > 0) {
      setSelectedAddressKey(addressOptions[0].key)
    }
  }, [addressOptions])

  // Handling possibly incorrectly (by MP) possible null values
  const suggestedAddresses =
    verifiedAddressResult.verifyAddressOrError?.suggestedAddresses ||
    ([] as NonNullable<
      NonNullable<
        NonNullable<AddressVerificationFlow_verifiedAddressResult$data>
      >["verifyAddressOrError"]
    >["suggestedAddresses"])
  const inputAddress = verifiedAddressResult.verifyAddressOrError
    ?.inputAddress as NonNullable<
    NonNullable<
      NonNullable<AddressVerificationFlow_verifiedAddressResult$data>
    >["verifyAddressOrError"]
  >["inputAddress"]
  const verificationStatus = verifiedAddressResult.verifyAddressOrError
    ?.verificationStatus as NonNullable<
    NonNullable<
      AddressVerificationFlow_verifiedAddressResult$data
    >["verifyAddressOrError"]
  >["verificationStatus"]
  const error = verifiedAddressResult.verifyAddressOrError
    ?.mutationError as NonNullable<
    AddressVerificationFlow_verifiedAddressResult$data["verifyAddressOrError"]
  >["mutationError"]

  useEffect(() => {
    const inputOption: AddressOption = {
      ...(inputAddress as any),
      key: "userAddress",
      recommended: false,
    }

    const formInput: AddressOption = {
      ...(formValues as any),
      key: "userAddress",
      recommended: false,
      lines: [formValues],
    }

    if (error) {
      setAddressOptions([formInput])
      setModalType(ModalType.REVIEW_AND_CONFIRM)
    } else {
      if (verificationStatus === "VERIFIED_NO_CHANGE") {
        onChosenAddress(inputOption.address as AddressValues, true)
      } else {
        if (verificationStatus === "VERIFIED_WITH_CHANGES") {
          setModalType(ModalType.SUGGESTIONS)
          trackEvent({
            action_type: "validationAddressViewed",
            context_module: ContextModule.ordersShipping,
            context_page_owner_type: OwnerType.ordersShipping,
            context_page_owner_id: contextPageOwnerSlug,
            user_id: user?.id,
            flow: "user adding shipping address",
            subject: "Confirm your delivery address",
            option: "suggestions",
          })

          const suggestedOptions = suggestedAddresses!
            .slice(0, 1)
            .map(({ address, lines }: any, index) => ({
              key: `suggestedAddress-${index}`,
              recommended: index === 0,
              lines: lines,
              address: address,
            }))
          setAddressOptions([...suggestedOptions, inputOption])
        } else {
          setAddressOptions([inputOption])
          setModalType(ModalType.REVIEW_AND_CONFIRM)
          trackEvent({
            action_type: "validationAddressViewed",
            context_module: ContextModule.ordersShipping,
            context_page_owner_type: OwnerType.ordersShipping,
            context_page_owner_id: contextPageOwnerSlug,
            user_id: user?.id,
            flow: "user adding shipping address",
            subject: "Check your delivery address",
            option: "review and confirm",
          })
        }
      }
    }
  }, [
    inputAddress,
    onChosenAddress,
    suggestedAddresses,
    verificationStatus,
    trackEvent,
    user,
    contextPageOwnerSlug,
    error,
  ])

  if (addressOptions.length === 0) return null

  if (modalType === ModalType.SUGGESTIONS) {
    return (
      <ModalDialog title="Confirm your delivery address" onClose={handleClose}>
        <Text>
          To ensure prompt and accurate delivery, we suggest a modified shipping
          address.
        </Text>
        <Spacer y={2} />
        <RadioGroup
          defaultValue={selectedAddressKey || ""}
          onSelect={(selected: AddressOption["key"]) => {
            setSelectedAddressKey(selected)
          }}
        >
          {addressOptions.map(
            ({ key, recommended, ...addressOption }) =>
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
          <Button onClick={handleBackToEdit} variant="secondaryBlack" flex={1}>
            Back to Edit
          </Button>
          <Spacer x={1} />
          <Button
            disabled={!(selectedAddressKey && selectedAddressKey.length > 0)}
            onClick={() => {
              if (selectedAddressKey) {
                trackEvent({
                  action_type: "clickedValidationAddress",
                  context_module: ContextModule.ordersShipping,
                  context_page_owner_type: OwnerType.ordersShipping,
                  context_page_owner_id: contextPageOwnerSlug,
                  user_id: user?.id,
                  subject: "Confirm your delivery address",
                  option: selectedAddressKey.includes("suggestedAddress")
                    ? "Recommended"
                    : "What you entered",
                  label: "Use This Address",
                })
              }

              chooseAddress()
            }}
            flex={1}
          >
            Use this Address
          </Button>
        </Flex>
      </ModalDialog>
    )
  }

  if (modalType === ModalType.REVIEW_AND_CONFIRM) {
    return (
      <ModalDialog title="Check your delivery address" onClose={handleClose}>
        <Text>
          The address you entered may be incorrect or incomplete. Please check
          it and make any changes necessary.
        </Text>
        <Spacer y={4} />
        <Text fontWeight="bold">What you entered</Text>
        <Spacer y={1} />
        <Box border="1px solid" borderColor="black30" p={2}>
          {addressOptions[0]!.lines!.map((line: string) => (
            <Text key={line}>{line}</Text>
          ))}
        </Box>
        <Spacer y={4} />
        <Flex width="100%" justifyContent="space-between">
          <Button
            onClick={() => {
              trackEvent({
                action_type: "clickedValidationAddress",
                context_module: ContextModule.ordersShipping,
                context_page_owner_type: OwnerType.ordersShipping,
                context_page_owner_id: contextPageOwnerSlug,
                user_id: user?.id,
                subject: "Check your delivery address",
                label: "Use This Address",
              })
              chooseAddress()
            }}
            variant="secondaryBlack"
            flex={1}
          >
            Use This Address
          </Button>
          <Spacer x={1} />
          <Button onClick={handleEditAddress} flex={1}>
            Edit Address
          </Button>
        </Flex>
      </ModalDialog>
    )
  }

  return <></>
}

const AddressVerificationFlowFragmentContainer = createFragmentContainer(
  AddressVerificationFlow,
  {
    verifiedAddressResult: graphql`
      fragment AddressVerificationFlow_verifiedAddressResult on VerifyAddressPayload {
        verifyAddressOrError {
          ... on VerifyAddressType {
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
          ... on VerifyAddressFailureType {
            mutationError {
              type
              message
              statusCode
            }
          }
        }
      }
    `,
  }
)

export const AddressVerificationFlowQueryRenderer: React.FC<{
  address: AddressValues
  onChosenAddress: (address: AddressValues, saveAndContinue: boolean) => void
  onClose: () => void
}> = ({ address, onChosenAddress, onClose }) => {
  return (
    <SystemQueryRenderer<AddressVerificationFlowQuery>
      variables={{ address }}
      render={({ props }) => {
        if (!props?.verifyAddress) {
          return <div>... loading ... </div>
        }

        return (
          <AddressVerificationFlowFragmentContainer
            verifiedAddressResult={props.verifyAddress}
            onChosenAddress={onChosenAddress}
            onClose={onClose}
          />
        )
      }}
      query={graphql`
        query AddressVerificationFlowQuery($address: VerifyAddressInput!) {
          verifyAddress(input: $address) {
            ...AddressVerificationFlow_verifiedAddressResult
          }
        }
      `}
    />
  )
}
