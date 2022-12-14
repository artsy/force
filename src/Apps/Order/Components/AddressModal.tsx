import { useState } from "react"
import {
  Banner,
  Button,
  Flex,
  ModalDialog,
  Spacer,
  Text,
  ModalWidth,
} from "@artsy/palette"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { AddressForm } from "Apps/Order/Components/AddressForm"

export const GENERIC_FAIL_MESSAGE =
  "Sorry there has been an issue saving your address. Please try again."

export interface ModalDetails {
  addressModalTitle: string
  addressModalAction: AddressModalAction
}

export interface Props {
  show: boolean
  closeModal: () => void
  address?: SavedAddressType
  onSuccess: (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
  modalDetails?: ModalDetails
  me: SavedAddresses_me$data
}

export type AddressModalAction = "editUserAddress" | "createUserAddress"

export const AddressModal: React.FC<Props> = ({
  show,
  closeModal,
  address,
  onSuccess,
  onDeleteAddress,
  onError,
  modalDetails,
  me,
}) => {
  const isCreateAddress =
    modalDetails?.addressModalAction === "createUserAddress"

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState(false)

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  const handleEditOrCreateAddressError = (message: string) => {
    setCreateUpdateError(GENERIC_FAIL_MESSAGE)
    onError(message)
  }

  const handleEditOrCreateAddressSuccess = (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => {
    handleModalClose()
    onSuccess(address)
  }

  return (
    <>
      {show && (
        <ModalDialog
          title={modalDetails?.addressModalTitle}
          onClose={handleModalClose}
          width={ModalWidth.Wide}
        >
          {createUpdateError && (
            <Banner my={2} data-test="credit-card-error" variant="error">
              {createUpdateError}
            </Banner>
          )}
          <AddressForm
            me={me}
            address={address}
            isCreateAddress={isCreateAddress}
            onEditOrCreateAddressError={handleEditOrCreateAddressError}
            onEditOrCreateAddressSuccess={handleEditOrCreateAddressSuccess}
            setShowDialog={setShowDialog}
          />
        </ModalDialog>
      )}

      {showDialog && (
        <ModalDialog
          data-test="deleteAddressDialog"
          title="Delete address?"
          onClose={() => setShowDialog(false)}
          width="350px"
        >
          <Text variant="xs">
            This will remove this address from your saved addressess.
          </Text>
          <Spacer y={2} />
          <Flex justifyContent="flex-end">
            <Button
              variant="secondaryNeutral"
              size="small"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Spacer x={1} />
            <Button
              size="small"
              onClick={() => {
                setShowDialog(false)
                closeModal()
                if (address?.internalID) {
                  onDeleteAddress(address.internalID)
                }
              }}
            >
              Delete
            </Button>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}
