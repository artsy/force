import React, { useState } from "react"
import { BellIcon, Button } from "@artsy/palette"
import { CreateSavedSearchAlert } from "v2/Components/SavedSearchAlert/CreateSavedSearchAlert"
import { SavedSearchAlertFormPropsBase } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"

export const CreateAlertButton: React.FC<SavedSearchAlertFormPropsBase> = ({
  artistId,
  artistName,
}) => {
  const [visibleForm, setVisibleForm] = useState(false)

  const handleOpenForm = () => setVisibleForm(true)
  const handleCloseForm = () => setVisibleForm(false)

  return (
    <>
      <Button onClick={handleOpenForm} variant="secondaryOutline" size="small">
        <BellIcon mr={0.5} color="currentColor" />
        Create an Alert
      </Button>
      <CreateSavedSearchAlert
        artistId={artistId}
        artistName={artistName}
        onClose={handleCloseForm}
        onComplete={handleCloseForm}
        visible={visibleForm}
      />
    </>
  )
}
