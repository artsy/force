import { ArtworkModalHeaderInfo } from "Apps/CollectorProfile/Routes/Saves/Components/ArtworkModalHeaderInfo"
import {
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { Button, Flex, Message, Spacer } from "@artsy/palette"
import type { FC } from "react"

export const SelectArtworkListsHeader: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { state, dispatch } = useManageArtworkForSavesContext()
  const artwork = state.artwork

  const openCreateArtworkListModal = () => {
    dispatch({
      type: "SET_MODAL_KEY",
      payload: ModalKey.CreateNewList,
    })
  }

  return (
    <>
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["stretch", "center"]}
      >
        <ArtworkModalHeaderInfo artwork={artwork as any} />

        <Spacer x={[0, 1]} y={[2, 0]} />

        <Button
          variant="secondaryBlack"
          size="small"
          onClick={openCreateArtworkListModal}
        >
          Create New List
        </Button>
      </Flex>

      {state.recentlyAddedList && (
        <>
          <Spacer y={2} />

          <Message variant="success" title="List created">
            Artwork will be added to {state.recentlyAddedList.name}
          </Message>
        </>
      )}
    </>
  )
}
