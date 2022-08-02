import React from "react"
import { omit } from "lodash"
import {
  ModalBase,
  ModalBaseProps,
  splitBoxProps,
  useDidMount,
  Box,
  DROP_SHADOW,
  CloseIcon,
  Clickable,
} from "@artsy/palette"

export type OnboardingModalProps = ModalBaseProps

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
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
        width: ["100%", 900],
        ...modalProps.dialogProps,
      }}
      {...omit(modalProps, "dialogProps")}
    >
      <Box
        width="100%"
        height="100vh"
        minHeight={["100vh", "100%"]}
        overflowY="auto"
        position="relative"
        bg="white100"
        style={{
          boxShadow: DROP_SHADOW,
          ...(isMounted
            ? {
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 100ms, transform 250ms",
              }
            : {
                opacity: 0,
                transform: "translateY(10px)",
              }),
        }}
        {...boxProps}
      >
        <Clickable
          p={2}
          ml="auto"
          onClick={onClose}
          aria-label="Close"
          position="absolute"
          top={0}
          right={0}
          zIndex={1}
        >
          <CloseIcon fill="black100" display="block" />
        </Clickable>

        {children}
      </Box>
    </ModalBase>
  )
}
