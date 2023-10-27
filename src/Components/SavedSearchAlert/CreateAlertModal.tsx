import React from "react"
import {
  ModalBase,
  ModalBaseProps,
  splitBoxProps,
  useDidMount,
  Box,
  DROP_SHADOW,
  ModalClose,
} from "@artsy/palette"

export type CreateAlertModalProps = ModalBaseProps

export const CreateAlertModal: React.FC<CreateAlertModalProps> = ({
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
        width: ["100%", 440],
        // height: "auto",
        // maxHeight: [null, 730],
      }}
      {...modalProps}
      title="Create Alert"
    >
      <Box
        width="100%"
        position="relative"
        bg="white100"
        overflowY="auto"
        style={{
          WebkitOverflowScrolling: "touch",
          boxShadow: DROP_SHADOW,
          ...(isMounted
            ? {
                opacity: 1,
                transform: "translateX(0)",
                transition: "opacity 5000ms, transform 5500ms",
              }
            : {
                opacity: 0,
                transform: "translateX(-2000px)",
              }),
        }}
        {...boxProps}
      >
        <ModalClose onClick={onClose} position="absolute" top={0} right={0} />

        {children}
      </Box>
    </ModalBase>
  )
}
