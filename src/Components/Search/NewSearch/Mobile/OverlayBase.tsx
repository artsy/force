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
        background: "black100",
        justifyContent: "center",
        backgroundColor: "white100",
      }}
    >
      <ModalDialogContent
        onClose={onClose}
        width="100%"
        height="100%"
        m={0}
        // contentProps={{
        //   px: 2,
        // }}
      >
        {children}
      </ModalDialogContent>
    </ModalBase>
  )
}
