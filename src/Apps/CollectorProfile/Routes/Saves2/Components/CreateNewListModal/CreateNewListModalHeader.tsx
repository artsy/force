import { Spacer } from "@artsy/palette"
import {
  ArtworkModalHeaderInfo,
  ArtworkModalHeaderInfoEntity,
} from "Apps/CollectorProfile/Routes/Saves2/Components/ArtworkModalHeaderInfo"
import { FC } from "react"

interface CreateNewListModalHeaderProps {
  artwork: ArtworkModalHeaderInfoEntity
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
