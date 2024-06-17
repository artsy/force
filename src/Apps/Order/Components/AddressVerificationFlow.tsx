import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer, graphql } from "react-relay"
import { AddressVerificationFlowQuery } from "__generated__/AddressVerificationFlowQuery.graphql"
import { AddressVerificationFlow_verifyAddress$data } from "__generated__/AddressVerificationFlow_verifyAddress.graphql"
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
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  ActionType,
  ClickedCloseValidationAddressModal,
  ClickedValidationAddressOptions,
  ContextModule,
  OwnerType,
  ValidationAddressViewed,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

type VerifyAddressSuccessType = Extract<
  AddressVerificationFlow_verifyAddress$data["verifyAddressOrError"],
  { __typename: "VerifyAddressType" }
>
type VerifyAddressErrorType = Extract<
  AddressVerificationFlow_verifyAddress$data["verifyAddressOrError"],
  { __typename: "VerifyAddressFailureType" }
>

export enum AddressVerifiedBy {
  USER = "USER",
  ARTSY = "ARTSY",
}

const USER_INPUT = "userInput"
type AddressOptionKey = typeof USER_INPUT | string

interface AddressVerificationFlowProps {
  verifyAddress: AddressVerificationFlow_verifyAddress$data
  onChosenAddress: (
    verifiedBy: AddressVerifiedBy,
    address: AddressValues
  ) => void
  onClose: () => void
  /* used only as a fallback if verification is unavailable */
  verificationInput: AddressValues
}

export interface AddressValues {
  addressLine1: string
  addressLine2?: string
  country: string
  city: string
  region: string
  postalCode: string
}

enum VerificationPath {
  ERROR_IMMEDIATE_CONFIRM = "error_immediate_confirm",
  IMMEDIATE_CONFIRM = "immediate_confirm",
  SUGGESTIONS = "suggestions",
  REVIEW_AND_CONFIRM = "review_and_confirm",
}

const modalTitles: Record<VerificationPath, string | null> = {
  [VerificationPath.SUGGESTIONS]: "Confirm your delivery address",
  [VerificationPath.REVIEW_AND_CONFIRM]: "Check your delivery address",
  [VerificationPath.ERROR_IMMEDIATE_CONFIRM]: null,
  [VerificationPath.IMMEDIATE_CONFIRM]: null,
} as const

interface AddressOption {
  key: AddressOptionKey
  recommended: boolean
  lines: string[]
  address: AddressValues
}

enum AddressSuggestionRadioButton {
  recommended = "Recommended",
  user_address = "What you entered",
}

const AddressVerificationFlow: React.FC<AddressVerificationFlowProps> = ({
  verificationInput,
  verifyAddress,
  onChosenAddress,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false)

  let verificationPath: VerificationPath
  let addressOptions: AddressOption[] = []

  const {
    trackViewedModal,
    trackClosedModal,
    trackSelectedAddress,
  } = useAddressVerificationTracking()

  const error = (verifyAddress.verifyAddressOrError as VerifyAddressErrorType)
    ?.mutationError
  const suggestedAddresses = (verifyAddress.verifyAddressOrError as VerifyAddressSuccessType)
    ?.suggestedAddresses
  const inputAddress = (verifyAddress.verifyAddressOrError as VerifyAddressSuccessType)
    ?.inputAddress
  const verificationStatus = (verifyAddress.verifyAddressOrError as VerifyAddressSuccessType)
    ?.verificationStatus

  const hasError = Boolean(error)

  if (hasError) {
    verificationPath = VerificationPath.ERROR_IMMEDIATE_CONFIRM
  } else {
    const inputOption: AddressOption = {
      ...(inputAddress as any),
      key: USER_INPUT,
      recommended: false,
    }
    if (verificationStatus === "VERIFIED_NO_CHANGE") {
      verificationPath = VerificationPath.IMMEDIATE_CONFIRM
      addressOptions = [inputOption]
    } else {
      if (verificationStatus === "VERIFIED_WITH_CHANGES") {
        verificationPath = VerificationPath.SUGGESTIONS

        const suggestedOptions = (suggestedAddresses || [])
          .slice(0, 1)
          .map(({ address, lines }: any, index) => ({
            key: `suggestedAddress-${index}`,
            recommended: index === 0,
            lines: lines,
            address: address,
          }))
        addressOptions = [...suggestedOptions, inputOption]
      } else {
        addressOptions = [inputOption]
        verificationPath = VerificationPath.REVIEW_AND_CONFIRM
      }
    }
  }

  const modalTitle = modalTitles[verificationPath]

  const [selectedAddressKey, setSelectedAddressKey] = useState<
    AddressOptionKey | undefined
  >(addressOptions[0]?.key)

  // perform only once when the flow first loads
  useEffect(() => {
    if (verificationPath === VerificationPath.ERROR_IMMEDIATE_CONFIRM) {
      const fallbackOption = fallbackFromFormValues(verificationInput)
      onChosenAddress(AddressVerifiedBy.USER, fallbackOption.address)
    } else if (verificationPath === VerificationPath.IMMEDIATE_CONFIRM) {
      onChosenAddress(AddressVerifiedBy.ARTSY, addressOptions[0].address!)
    } else {
      setShowModal(true)

      trackViewedModal({
        subject: modalTitle!,
        option:
          verificationPath === VerificationPath.SUGGESTIONS
            ? "suggestions"
            : "review and confirm",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const chooseAddress = useCallback(() => {
    if (!selectedAddressKey) return

    const selectedAddress = addressOptions.find(
      option => option.key === selectedAddressKey
    )

    const verifiedBy =
      selectedAddressKey === USER_INPUT
        ? AddressVerifiedBy.USER
        : AddressVerifiedBy.ARTSY

    if (selectedAddress) {
      setShowModal(false)
      onChosenAddress(verifiedBy, selectedAddress.address)
    }
  }, [addressOptions, onChosenAddress, selectedAddressKey])

  const handleCloseModal = ({
    label,
    subject,
  }: {
    label: string | null
    subject: string
  }) => {
    trackClosedModal({
      subject,
      label,
      option: null,
    })
    onClose()
  }

  if (
    [
      VerificationPath.ERROR_IMMEDIATE_CONFIRM,
      VerificationPath.IMMEDIATE_CONFIRM,
    ].includes(verificationPath)
  ) {
    return <div data-testid="emptyAddressVerification"></div>
  }

  return !showModal ? null : (
    <ModalDialog
      width={["100%", 590]}
      height={["100vh", "auto"]}
      m={[0, 2]}
      title={modalTitle!}
      onClose={() => {
        handleCloseModal({ label: null, subject: modalTitle! })
      }}
      data-testid="addressVerificationModal"
    >
      {verificationPath === VerificationPath.SUGGESTIONS ? (
        <>
          <Text>
            To ensure prompt and accurate delivery, we suggest a modified
            shipping address.
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
            <Button
              // prevent a parent formik context from treating this as a submit button
              type="button"
              onClick={() => {
                handleCloseModal({
                  label: "Back to Edit",
                  subject: modalTitle!,
                })
              }}
              variant="secondaryBlack"
              flex={1}
            >
              Back to Edit
            </Button>
            <Spacer x={1} />
            <Button
              disabled={!(selectedAddressKey && selectedAddressKey.length > 0)}
              onClick={e => {
                // Because a <button> is treated as type="submit" by default, it
                // will trigger the formik submit handler if it is inside a formik
                // <Form />. We want to make this behavior more explicitly handled
                // by this component's `chooseAddress()` logic.
                e.preventDefault()
                if (selectedAddressKey) {
                  trackSelectedAddress({
                    subject: modalTitle!,
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
              Use This Address
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Text>
            The address you entered may be incorrect or incomplete. Please check
            it and make any changes necessary.
          </Text>
          <Spacer y={4} />
          <Text fontWeight="bold">What you entered</Text>
          <Spacer y={1} />
          <Box
            border="1px solid"
            borderColor="black5"
            p={2}
            backgroundColor="black5"
          >
            {addressOptions[0]!.lines!.map((line: string) => (
              <Text key={line}>{line}</Text>
            ))}
          </Box>
          <Spacer y={4} />
          <Flex width="100%" justifyContent="space-between">
            <Button
              onClick={() => {
                trackSelectedAddress({
                  subject: modalTitle!,
                  option: "What you entered",
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
            <Button
              onClick={() => {
                handleCloseModal({
                  label: "Edit Address",
                  subject: modalTitle!,
                })
              }}
              flex={1}
            >
              Edit Address
            </Button>
          </Flex>
        </>
      )}
    </ModalDialog>
  )
}

export const AddressVerificationFlowFragmentContainer = createFragmentContainer(
  AddressVerificationFlow,
  {
    verifyAddress: graphql`
      fragment AddressVerificationFlow_verifyAddress on VerifyAddressPayload {
        verifyAddressOrError {
          __typename
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
            addressVerificationId
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
  onChosenAddress: (
    verifiedBy: AddressVerifiedBy,
    address: AddressValues
  ) => void
  onClose: () => void
}> = ({ address, onChosenAddress, onClose }) => {
  return (
    <SystemQueryRenderer<AddressVerificationFlowQuery>
      variables={{ address }}
      render={({ props }) => {
        if (!props?.verifyAddress) {
          return null
        }

        return (
          <AddressVerificationFlowFragmentContainer
            verificationInput={address}
            verifyAddress={props.verifyAddress}
            onChosenAddress={onChosenAddress}
            onClose={onClose}
          />
        )
      }}
      query={graphql`
        query AddressVerificationFlowQuery($address: VerifyAddressInput!) {
          verifyAddress(input: $address) {
            ...AddressVerificationFlow_verifyAddress
          }
        }
      `}
    />
  )
}

const fallbackFromFormValues = (address: AddressValues): AddressOption => {
  return {
    key: USER_INPUT,
    recommended: false,
    lines: [
      address.addressLine1,
      address.addressLine2 || null,
      `${address.city}, ${address.region} ${address.postalCode}`,
      address.country,
    ].filter(Boolean) as string[],

    address: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      region: address.region,
      country: address.country,
      city: address.city,
      postalCode: address.postalCode,
    },
  }
}

const useAddressVerificationTracking = () => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerId } = useAnalyticsContext()
  const { user } = useSystemContext()
  const userId = user?.id

  return {
    trackViewedModal: useCallback(
      ({ subject, option }: { subject: string; option: string }) => {
        trackEvent({
          action: ActionType.validationAddressViewed,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: OwnerType.ordersShipping,
          context_page_owner_id: contextPageOwnerId,
          user_id: userId,
          flow: "user adding shipping address",
          subject,
          option,
        } as ValidationAddressViewed)
      },
      [contextPageOwnerId, trackEvent, userId]
    ),

    trackSelectedAddress: useCallback(
      ({
        label,
        option,
        subject,
      }: {
        label: string
        option: string
        subject: string
      }) => {
        const event: ClickedValidationAddressOptions = {
          action: ActionType.clickedValidationAddressOptions,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: OwnerType.ordersShipping,
          context_page_owner_id: contextPageOwnerId!,
          user_id: userId!,
          subject,
          option,
          label,
        }
        trackEvent(event)
      },
      [contextPageOwnerId, trackEvent, userId]
    ),

    trackClosedModal: useCallback(
      ({
        label = null,
        option = null,
        subject,
      }: {
        label: string | null
        option: string | null
        subject: string
      }) => {
        const event: ClickedCloseValidationAddressModal = {
          action: ActionType.clickedCloseValidationAddressModal,
          context_module: ContextModule.ordersShipping,
          context_page_owner_type: OwnerType.ordersShipping,
          context_page_owner_id: contextPageOwnerId!,
          subject,
          // TODO: Update cohesion schema to allow for optional fields and remove casting
          option: option as string,
          label: label as string,
        }
        trackEvent(event)
      },
      [contextPageOwnerId, trackEvent]
    ),
  }
}
