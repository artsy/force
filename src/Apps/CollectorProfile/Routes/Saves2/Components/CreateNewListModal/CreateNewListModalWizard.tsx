import { FC, useState } from "react"
import { CreateNewListModal, ArtworkList } from "./CreateNewListModal"
import { AddArtworksModal } from "./AddArtworksModal"
import { graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  CreateNewListModalWizardQuery,
  CreateNewListModalWizardQuery$data,
} from "__generated__/CreateNewListModalWizardQuery.graphql"

export interface CreateNewListModalWizardProps {
  onComplete: (artworkList: ArtworkList) => void
  onClose: () => void
  me: CreateNewListModalWizardQuery$data["me"]
}

export const CreateNewListModalWizard: FC<CreateNewListModalWizardProps> = ({
  onComplete,
  onClose,
  me,
}) => {
  const [artworkList, setArtworkList] = useState<ArtworkList | null>(null)

  const handleCreateListComplete = (list: ArtworkList) => {
    if (me?.collection?.artworksConnection?.totalCount === 0) {
      onComplete(list)
      return
    }

    setArtworkList(list)
  }

  const handleAddArtworksComplete = () => {
    onComplete(artworkList!)
  }

  if (artworkList !== null) {
    return (
      <AddArtworksModal
        onComplete={handleAddArtworksComplete}
        artworkList={artworkList}
      />
    )
  }

  return (
    <CreateNewListModal
      onClose={onClose}
      onComplete={handleCreateListComplete}
    />
  )
}

export interface CreateNewListModalWizardQueryRendererProps {
  onComplete: (artworkList: ArtworkList) => void
  onClose: () => void
}

export const CreateNewListModalWizardQueryRenderer: FC<CreateNewListModalWizardQueryRendererProps> = props => {
  return (
    <SystemQueryRenderer<CreateNewListModalWizardQuery>
      query={graphql`
        query CreateNewListModalWizardQuery {
          me {
            collection(id: "saved-artwork") {
              artworksConnection {
                totalCount
              }
            }
          }
        }
      `}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.me) {
          return <></>
        }

        return <CreateNewListModalWizard me={relayProps.me} {...props} />
      }}
    />
  )
}
