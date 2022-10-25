import { useState } from "react"
import * as React from "react"
import { Dialog, ModalDialog } from "@artsy/palette"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { useSystemContext } from "System/SystemContext"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { AddressForm } from "Components/Address/AddressForm2"
import { AddressType } from "Components/Address/AddressFormFields"

export type AddressModalAction = "editUserAddress" | "createUserAddress"

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

export const AddressModal: React.FC<Props> = props => {
  const {
    show,
    closeModal,
    address,
    onDeleteAddress,
    modalDetails,
    onSuccess,
    onError,
    me,
  } = props

  const title = modalDetails?.addressModalTitle

  const { relayEnvironment } = useSystemContext()

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  if (!relayEnvironment) return null

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  return (
    <>
      {show && (
        <ModalDialog
          title={title}
          onClose={() => handleModalClose()}
          width="900px"
        >
          <AddressForm
            closeModal={closeModal}
            address={address}
            onSuccess={onSuccess}
            onDeleteAddress={onDeleteAddress}
            onError={onError}
            modalDetails={modalDetails}
            me={me}
          />
        </ModalDialog>
      )}
      <Dialog
        title="Delete address?"
        detail="This will remove this address from your saved addresses."
        show={showDialog}
        primaryCta={{
          action: () => {
            setShowDialog(false)
            closeModal()
            if (address?.internalID) {
              onDeleteAddress(address.internalID)
            }
          },
          text: "Delete",
        }}
        secondaryCta={{
          action: () => {
            setShowDialog(false)
          },
          text: "Cancel",
        }}
        onClose={() => setShowDialog(false)}
      />
    </>
  )
}
