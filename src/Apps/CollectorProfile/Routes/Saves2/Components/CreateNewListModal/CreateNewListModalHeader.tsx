import { Spacer } from "@artsy/palette"
import { ArtworkModalHeaderInfo } from "Apps/CollectorProfile/Routes/Saves2/Components/ArtworkModalHeaderInfo"
import { ArtworkEntity } from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"

interface CreateNewListModalHeaderProps {
  artwork: ArtworkEntity
}

export const CreateNewListModalHeader: FC<CreateNewListModalHeaderProps> = ({
  artwork,
}) => {
  return (
    <>
      <ArtworkModalHeaderInfo artwork={artwork} />
      <Spacer y={2} />
    </>
  )
}
