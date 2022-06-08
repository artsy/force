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
  useThemeConfig,
  TextVariant,
} from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import {
  AddressModal,
  ModalDetails,
} from "v2/Apps/Order/Components/AddressModal"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import createLogger from "v2/Utils/logger"
import { SavedAddressItem } from "v2/Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"
import { useSystemContext } from "v2/System/SystemContext"
import { compact } from "lodash"
import { extractNodes } from "v2/Utils/extractNodes"
import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"
import { useTracking } from "v2/System"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  onChangeAddressCount?: (active?: number) => void
  me: SavedAddresses_me
  onSelect?: (string) => void
  inCollectorProfile: boolean
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
  onAddressDelete?: (removedAddressId: string) => void
  onAddressCreate?: (
    address: CreateUserAddressMutationResponse["createUserAddress"]
  ) => void
  onAddressEdit?: (
    address: UpdateUserAddressMutationResponse["updateUserAddress"]
  ) => void
  selectedAddress?: string
  onShowToast?: (isShow: boolean, action: string) => void
}

type Address = NonNullable<
  NonNullable<
    NonNullable<NonNullable<SavedAddresses_me["addressConnection"]>["edges"]>[0]
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
  const [address, setAddress] = useState<Address | undefined | null>(null)
  const logger = createLogger("SavedAddresses.tsx")
  const {
    onSelect,
    onChangeAddressCount,
    me,
    inCollectorProfile,
    relay,
    onAddressDelete,
    onAddressCreate,
    selectedAddress,
    onShowToast,
    onAddressEdit,
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
    let response = await deleteUserAddress(
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
    if (!response.deleteUserAddress?.userAddressOrErrors.errors) {
      onShowToast && onShowToast(true, "Deleted")
    }
  }

  const handleEditAddress = (address: Address, index: number) => {
    setShowAddressModal(true)
    setModalDetails({
      addressModalTitle: "Edit address",
      addressModalAction: "editUserAddress",
    })
    setAddress(address)
  }

  const createOrUpdateAddressSuccess = (
    address?: UpdateUserAddressMutationResponse &
      CreateUserAddressMutationResponse
  ) => {
    refetchAddresses(() => {
      if (address?.createUserAddress) {
        onAddressCreate && onAddressCreate(address.createUserAddress)
      } else if (address?.updateUserAddress) {
        onAddressEdit && onAddressEdit(address.updateUserAddress)
      }
    })

    onShowToast && onShowToast(true, "Saved")
  }

  const trackAddAddressClick = () => {
    trackEvent({
      action: ActionType.clickedAddNewShippingAddress,
      context_page_owner_type: OwnerType.ordersShipping,
      context_module: ContextModule.ordersShipping,
    })
  }

  const styles = useThemeConfig({
    v2: {
      variant: "text" as TextVariant,
    },
    v3: {
      variant: "sm" as TextVariant,
    },
  })

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
                <Text textAlign="left" variant={styles.variant}>
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
                  variant={styles.variant}
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
                  variant={styles.variant}
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
      <AddressModal
        show={showAddressModal}
        modalDetails={modalDetails}
        closeModal={() => setShowAddressModal(false)}
        address={address || undefined}
        onSuccess={createOrUpdateAddressSuccess}
        onDeleteAddress={handleDeleteAddress}
        onError={onError}
        me={me}
      />
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
