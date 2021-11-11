import React, { useState } from "react"
import { BellIcon, Button, ButtonProps } from "@artsy/palette"
import { CreateSavedSearchAlert } from "v2/Components/SavedSearchAlert/CreateSavedSearchAlert"
import { SavedSearchAttributes } from "../types"

interface CreateAlertButtonProps extends ButtonProps {
  savedSearchAttributes: SavedSearchAttributes
}

export const CreateAlertButton: React.FC<CreateAlertButtonProps> = ({
  savedSearchAttributes,
  ...props
}) => {
  const [visibleForm, setVisibleForm] = useState(false)

  const handleOpenForm = () => setVisibleForm(true)
  const handleCloseForm = () => setVisibleForm(false)

  return (
    <>
      <Button
        onClick={handleOpenForm}
        variant="secondaryOutline"
        size="small"
        {...props}
      >
        <BellIcon mr={0.5} color="currentColor" />
        Create an Alert
      </Button>
      <CreateSavedSearchAlert
        savedSearchAttributes={savedSearchAttributes}
        onClose={handleCloseForm}
        onComplete={handleCloseForm}
        visible={visibleForm}
      />
    </>
  )
}
