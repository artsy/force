import { ModalBase, ModalDialogContent } from "@artsy/palette"
import { FC } from "react"

interface OverlayBaseProps {
  onClose: () => void
}

export const OverlayBase: FC<OverlayBaseProps> = ({ children, onClose }) => {
  return (
    <ModalBase
      dialogProps={{
        width: "100%",
        height: "100%",
        background: "black",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ModalDialogContent
        onClose={onClose}
        width={"100%"}
        height={"100%"}
        margin={0} // TODO: ignored, fix it in palette
      >
        {children}
      </ModalDialogContent>
    </ModalBase>
  )
}
