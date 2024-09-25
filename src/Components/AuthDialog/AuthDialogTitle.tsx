import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, BoxProps, Clickable, Stack, Text } from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { FC } from "react"

interface AuthDialogTitleProps extends BoxProps {
  title: string
  onClose?: () => void
}

export const AuthDialogTitle: FC<AuthDialogTitleProps> = ({
  title,
  onClose,
  ...rest
}) => {
  const {
    dispatch,
    state: { mode },
  } = useAuthDialogContext()
  return (
    <Stack gap={4} {...rest}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Clickable
          style={{
            ...(mode === "Welcome" ? { visibility: "hidden" } : {}),
          }}
          onClick={() => {
            dispatch({ type: "MODE", payload: { mode: "Welcome" } })
          }}
        >
          <ChevronLeftIcon />
        </Clickable>

        <ArtsyLogoIcon height={30} />

        <Clickable
          onClick={onClose}
          aria-label="Close"
          style={{
            ...(onClose ? {} : { visibility: "hidden" }),
          }}
        >
          <CloseIcon fill="currentColor" display="block" />
        </Clickable>
      </Box>

      <Text variant="lg-display" lineClamp={6} hyphenate>
        {title}
      </Text>
    </Stack>
  )
}
