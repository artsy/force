import React from "react"
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
      dialogProps={{ width: ["100%", 900] }}
      {...modalProps}
    >
      <Box
        width="100%"
        height={["100vh", 700]}
        overflowY="auto"
        position="relative"
        bg="white100"
        style={{
          boxShadow: DROP_SHADOW,
          ...(isMounted
            ? {
                opacity: 1,
                transition: "opacity 250ms, transform 250ms",
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
          display={["none", "block"]}
        >
          <CloseIcon fill="black100" display="block" />
        </Clickable>

        {children}
      </Box>
    </ModalBase>
  )
}
