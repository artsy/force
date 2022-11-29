import {
  Button,
  RadioGroup,
  BorderedRadio,
  Spacer,
  ModalDialog,
  ModalWidth,
  Collapse,
} from "@artsy/palette"
import { useEffect, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
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
  ShippingAddressForm,
  AddressValues,
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
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
  onAddressDelete?: (id: string) => void
  onAddressEdit?: (address: AddressValues) => void
  onAddressCreate?: (address: AddressValues) => void
  selectedAddress?: string
  setSaveAddress?: (saveAddress: boolean) => void
  saveAddress?: boolean
  onContinue?: () => void
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
    relay,
    onAddressDelete,
    onAddressEdit,
    onAddressCreate,
    selectedAddress,
    setSaveAddress,
    saveAddress,
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

  const onSuccess = (address: AddressValues) => {
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

  const addAddressButton = (
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

  const addressItem = compact(addressList).map((address, index) => {
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

  return (
    <>
      <Collapse open={addressList.length > 0}>
        <>
          <RadioGroup
            onSelect={onSelect}
            defaultValue={selectedAddress || defaultAddressIndex(addressList)}
          >
            {addressItem}
          </RadioGroup>
          <Spacer mb={14} />
          {addAddressButton}
        </>
      </Collapse>
      <Collapse open={addressList.length === 0}>
        <ShippingAddressForm
          onSuccess={onSuccess}
          setSaveAddress={setSaveAddress}
          saveAddress={saveAddress}
        />
      </Collapse>

      <Spacer mb={4} />

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
}

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
