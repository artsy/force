import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { UtilButton } from "./UtilButton"

export const ArtworkActionsAlertButton: React.FC = () => {
  return (
    <CreateAlertButton
      renderButton={props => (
        <UtilButton {...props} name="bell" label="Create Alert" />
      )}
    />
  )
}
