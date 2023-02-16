import React, { useState } from "react"
import { Flex, Text, Spacer, Button, Join } from "@artsy/palette"
import { CreateNewListModalContainer } from "./CreateNewListModal"
import { Media } from "Utils/Responsive"
import { CreateCollectionMutationResult } from "Apps/CollectorProfile/Routes/Saves2/types"
import { useToasts } from "@artsy/palette"

export const SavesHeader: React.FC = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const { sendToast } = useToasts()

  const handleCreateNewListClick = () => {
    setModalIsOpened(true)
  }

  const handleComplete = (result: CreateCollectionMutationResult) => {
    console.log("[Debug] handleComplete", result)
    setModalIsOpened(false)

    sendToast({
      variant: "success",
      message: "List created",
    })
  }

  return (
    <>
      <CreateNewListModalContainer
        visible={modalIsOpened}
        onClose={() => setModalIsOpened(false)}
        onComplete={handleComplete}
      />

      <Join separator={<Spacer y={0.5} />}>
        <Text variant="lg-display">Saved Artworks</Text>

        {/* Desktop view */}
        <Media greaterThanOrEqual="sm">
          <Flex justifyContent="space-between">
            <Text variant="sm-display" color="black60">
              Curate your own lists of the works you love
            </Text>
            <Button
              variant="secondaryBlack"
              size="small"
              onClick={handleCreateNewListClick}
            >
              Create New List
            </Button>
          </Flex>
        </Media>

        {/* Mobile view */}
        <Media lessThan="sm">
          <Text variant="sm-display" color="black60">
            Curate your own lists of the works you love
          </Text>
          <Spacer y={2} />
          <Button
            variant="secondaryBlack"
            size="small"
            onClick={handleCreateNewListClick}
          >
            Create New List
          </Button>
        </Media>
      </Join>
    </>
  )
}
