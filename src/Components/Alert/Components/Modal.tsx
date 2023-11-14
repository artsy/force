import {
  ModalBase,
  ModalBaseProps,
  splitBoxProps,
  useDidMount,
  Box,
  ModalClose,
} from "@artsy/palette"
import React from "react"

export type AlertModalProps = ModalBaseProps

export const Modal: React.FC<AlertModalProps> = ({
  children,
  onClose,
  title,
  ...rest
}) => {
  const isMounted = useDidMount()
  const [boxProps, modalProps] = splitBoxProps(rest)

  return (
    <ModalBase
      onClose={onClose}
      style={
        isMounted
          ? {
              backgroundColor: "rgba(229, 229, 229, 0.5)",
              transition: "background-color 250ms",
            }
          : { backgroundColor: "transparent" }
      }
      dialogProps={{
        height: ["100%", "auto"],
        width: ["100%", "auto"],
        maxHeight: ["auto", "90%"],
        minWidth: ["auto", 500],
      }}
      {...modalProps}
      title="Create Alert"
    >
      <Box
        width="100%"
        height="100%"
        position="relative"
        overflowY="auto"
        bg="white100"
        {...boxProps}
      >
        <ModalClose onClick={onClose} position="absolute" top={0} right={0} />

        {children}
      </Box>
    </ModalBase>
  )
}
