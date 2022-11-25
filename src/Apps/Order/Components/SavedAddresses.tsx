import {
  Box,
  Button,
  RadioGroup,
  BorderedRadio,
  Spacer,
  Flex,
  Text,
  Separator,
  BorderBox,
  Join,
  Clickable,
  ModalDialog,
  ModalWidth,
} from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { ModalDetails } from "Apps/Order/Components/AddressModal"
import { CommitMutation } from "Apps/Order/Utils/commitMutation"
import createLogger from "Utils/logger"
import { SavedAddressItem } from "Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"
import { useSystemContext } from "System/SystemContext"
import { compact } from "lodash"
import { extractNodes } from "Utils/extractNodes"
import { useTracking } from "react-tracking"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import {
  ShippingAddress,
  ShippingAddressForm,
} from "Components/Address/ShippingAddressForm"
import {
  SavedAddressType,
  convertShippingAddressToMutationInput,
} from "Apps/Order/Utils/shippingUtils"
export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  onChangeAddressCount?: (active?: number) => void
  me: SavedAddresses_me$data
  onSelect?: (string) => void
  inCollectorProfile: boolean
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
  onAddressDelete?: (id: string) => void
  onAddressEdit?: (address: {
    internalID: string
    attributes: ShippingAddress
  }) => void
  onAddressCreate?: (address: {
    internalID: string
    attributes: ShippingAddress
  }) => void
  selectedAddress?: string
}

type Address = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<SavedAddresses_me$data["addressConnection"]>["edges"]
    >[0]
  >["node"]
>

const defaultAddressIndex = (addressList: Address[]) => {
  const items = compact(addressList)

  if (!items || items.length == 0) {
    return
  }

  const defaultAddressID = items.find(node => node.isDefault)?.internalID

  return defaultAddressID || items[0].internalID
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const { trackEvent } = useTracking()
  const [modalDetails, setModalDetails] = useState<ModalDetails | undefined>()
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false)
  const [address, setAddress] = useState<SavedAddressType | null>(null)
  const logger = createLogger("SavedAddresses.tsx")
  const {
    onSelect,
    onChangeAddressCount,
    me,
    inCollectorProfile,
    relay,
    onAddressDelete,
    onAddressEdit,
    onAddressCreate,
    selectedAddress,
  } = props

  useEffect(() => {
    onChangeAddressCount &&
      onChangeAddressCount(me.addressConnection?.totalCount)
    // FIXME: Remove this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me.addressConnection?.totalCount])

  const addressList = extractNodes(me?.addressConnection) ?? []
  const { relayEnvironment } = useSystemContext()

  const refetchAddresses = (refetchSuccessCallback?: () => void) => {
    relay.refetch(
      {
        first: PAGE_SIZE,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
        } else {
          refetchSuccessCallback && refetchSuccessCallback()
        }
      }
    )
  }

  const onError = (message: string) => {
    logger.error(message)
  }

  const handleDeleteAddress = async (addressID: string) => {
    await deleteUserAddress(
      relayEnvironment!,
      addressID,
      () => {
        refetchAddresses(() => {
          // Execute address delete callback after address deleted
          // and list of addresses updated
          onAddressDelete && onAddressDelete(addressID)
        })
      },
      onError
    )
  }

  const handleEditAddress = (address: Address, index: number) => {
    setShowAddressModal(true)
    setModalDetails({
      addressModalTitle: "Edit address",
      addressModalAction: "editUserAddress",
    })
    setAddress(address)
  }

  const onSuccess = (address: {
    attributes: ShippingAddress
    internalID: string
  }) => {
    if (modalDetails?.addressModalAction === "editUserAddress") {
      refetchAddresses(() => onAddressEdit?.(address))
    } else {
      refetchAddresses(() => onAddressCreate?.(address))
    }
  }

  const trackAddAddressClick = () => {
    trackEvent({
      action: ActionType.clickedAddNewShippingAddress,
      context_page_owner_type: OwnerType.ordersShipping,
      context_module: ContextModule.ordersShipping,
    })
  }

  const collectorProfileAddressItems = addressList.map((address, index) => {
    if (!address) {
      return null
    }

    const isDefaultAddress = address.isDefault
    return (
      <BorderBox
        p={2}
        mb={2}
        width={340}
        flexDirection="column"
        key={"addressIndex" + index}
      >
        <SavedAddressItem
          index={index}
          address={address}
          handleClickEdit={() => handleEditAddress(address, index)}
        />
        <Box mt="auto">
          <Separator my={2} />
          <ModifyAddressWrapper width="100%">
            {isDefaultAddress && (
              <Box mr={[2, 1]}>
                <Text textAlign="left" variant="sm">
                  Default Address
                </Text>
              </Box>
            )}
            <Box ml="auto">
              <Clickable
                mr={[2, 1]}
                textDecoration="underline"
                data-test="editAddressInProfileClick"
                onClick={() => handleEditAddress(address, index)}
              >
                <Text
                  variant="sm"
                  style={{
                    cursor: "pointer",
                  }}
                  data-test="editAddressInProfile"
                >
                  Edit
                </Text>
              </Clickable>

              <Clickable
                textDecoration="underline"
                data-test="deleteAddressInProfile"
                onClick={() => handleDeleteAddress(address.internalID)}
              >
                <Text
                  variant="sm"
                  color="red100"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Delete
                </Text>
              </Clickable>
            </Box>
          </ModifyAddressWrapper>
        </Box>
      </BorderBox>
    )
  })

  const addAddressButton = (
    <>
      {inCollectorProfile ? (
        <Button
          mb={2}
          mt={[2, 4]}
          data-test="profileButton"
          variant="secondaryBlack"
          onClick={() => {
            setShowAddressModal(true),
              setModalDetails({
                addressModalTitle: "Add new address",
                addressModalAction: "createUserAddress",
              })
          }}
        >
          Add a new address
        </Button>
      ) : (
        addressList.length > 0 && (
          <Button
            mt={[2, 4]}
            mb={2}
            data-test="shippingButton"
            variant="secondaryBlack"
            onClick={() => {
              trackAddAddressClick()
              setShowAddressModal(true),
                setModalDetails({
                  addressModalTitle: "Add address",
                  addressModalAction: "createUserAddress",
                })
            }}
          >
            Add a new address
          </Button>
        )
      )}
      {showAddressModal && (
        <ModalDialog
          title={modalDetails?.addressModalTitle}
          width={ModalWidth.Wide}
          onClose={() => setShowAddressModal(false)}
        >
          <ShippingAddressForm
            address={
              modalDetails?.addressModalAction === "editUserAddress"
                ? convertShippingAddressToMutationInput(address)
                : undefined
            }
            onDelete={
              modalDetails?.addressModalAction === "editUserAddress"
                ? handleDeleteAddress
                : undefined
            }
            onClose={() => setShowAddressModal(false)}
            onSuccess={onSuccess}
          />
        </ModalDialog>
      )}
    </>
  )

  const addressItems = compact(addressList).map((address, index) => {
    return (
      <BorderedRadio
        value={address.internalID}
        key={index}
        position="relative"
        data-test="savedAddress"
      >
        <SavedAddressItem
          index={index}
          address={address}
          handleClickEdit={() => handleEditAddress(address, index)}
        />
      </BorderedRadio>
    )
  })

  return inCollectorProfile ? (
    <>
      <Flex flexWrap="wrap" flexDirection="row">
        <Join separator={<Spacer mr={2} />}>
          {collectorProfileAddressItems.length ? (
            collectorProfileAddressItems
          ) : (
            <Text color="black60" variant="sm">
              Please add an address for a faster checkout experience in the
              future.
            </Text>
          )}
        </Join>
      </Flex>
      {addAddressButton}
    </>
  ) : (
    <>
      <RadioGroup
        onSelect={onSelect}
        defaultValue={selectedAddress || defaultAddressIndex(addressList)}
      >
        {addressItems}
      </RadioGroup>
      <Spacer mb={14} />
      {addAddressButton}
      <Spacer mb={4} />
    </>
  )
}

const ModifyAddressWrapper = styled(Flex)`
  align-self: flex-end;
  justify-content: space-between;
`

export const SavedAddressesFragmentContainer = createRefetchContainer(
  SavedAddresses,
  {
    me: graphql`
      fragment SavedAddresses_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) @connection(key: "SavedAddresses_addressConnection") {
          totalCount
          edges {
            node {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  },
  graphql`
    query SavedAddressesRefetchQuery {
      me {
        ...SavedAddresses_me
      }
    }
  `
)
