import { OfferSettingsModal } from "Apps/CollectorProfile/Routes/Saves/Components/OfferSettingsModal/OfferSettingsModal"
import { ProgressiveOnboardingSaveOfferSettings } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveOfferSettings"
import { ProgressiveOnboardingSaveTitle } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveTitle"
import { RouterLink } from "System/Components/RouterLink"
import {
  Box,
  Button,
  Flex,
  Join,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import type { CollectorProfileSavesRoute_me$data } from "__generated__/CollectorProfileSavesRoute_me.graphql"
import { type FC, useState } from "react"
import type { ArtworkList } from "./CreateNewListModal/CreateNewListModal"
import { CreateNewListModalWizard } from "./CreateNewListModal/CreateNewListModalWizard"

interface ArtworkListsHeaderProps {
  savedArtworksCount: number
  me: CollectorProfileSavesRoute_me$data
}

export const ArtworkListsHeader: FC<
  React.PropsWithChildren<ArtworkListsHeaderProps>
> = ({ savedArtworksCount, me }) => {
  const { sendToast } = useToasts()
  const [createModalIsOpened, setCreateModalIsOpened] = useState(false)
  const [editModalIsOpened, setEditModalIsOpened] = useState(false)

  const handleCreateListClick = () => {
    setCreateModalIsOpened(true)
  }

  const handleEditListClick = () => {
    setEditModalIsOpened(true)
  }

  const handleCreateComplete = (artworkList: ArtworkList) => {
    setCreateModalIsOpened(false)

    sendToast({
      variant: "success",
      message: `${artworkList.name}} Created`,
    })
  }

  const handleCreateClose = () => {
    setCreateModalIsOpened(false)
  }

  const handleEditClose = () => {
    setEditModalIsOpened(false)
  }

  return (
    <>
      {createModalIsOpened && (
        <CreateNewListModalWizard
          onComplete={handleCreateComplete}
          onClose={handleCreateClose}
          savedArtworksCount={savedArtworksCount}
        />
      )}

      {editModalIsOpened && (
        <OfferSettingsModal me={me} onClose={handleEditClose} />
      )}

      <Join separator={<Spacer y={0.5} />}>
        <Text variant={["md", "lg-display"]}>Saves</Text>

        <Box
          display={["block", "flex"]}
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          alignItems={["stretch", "center"]}
        >
          <Text variant="sm-display" color="mono60">
            <ProgressiveOnboardingSaveTitle>
              Curate your own lists of the works you love and{" "}
              <RouterLink to="https://support.artsy.net/s/article/Offers-on-saved-works">
                signal your interest to galleries
              </RouterLink>
            </ProgressiveOnboardingSaveTitle>
          </Text>

          <Flex>
            <ProgressiveOnboardingSaveOfferSettings>
              <Button
                variant="tertiary"
                size={["small", "large"]}
                onClick={handleEditListClick}
                mt={[2, 0]}
              >
                Offer Settings
              </Button>
            </ProgressiveOnboardingSaveOfferSettings>

            <Spacer x={4} />

            <Button
              variant="secondaryBlack"
              size={["small", "large"]}
              onClick={handleCreateListClick}
              mt={[2, 0]}
            >
              Create New List
            </Button>
          </Flex>
        </Box>
      </Join>
    </>
  )
}
