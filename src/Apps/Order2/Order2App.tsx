import { Box, type BoxProps, breakpoints } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { ErrorPage } from "Components/ErrorPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type * as React from "react"
import { Meta } from "react-head"
import styled from "styled-components"

export const Order2App: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isRedesignEnabled = useFlag("emerald_checkout-redesign")
  const { isEigen } = useSystemContext()

  // TODO: This renders briefly before the real page appears (checkout & details)
  if (!isRedesignEnabled) return <ErrorPage code={404} />

  return (
    <>
      <Meta
        name="viewport"
        content={
          isEigen
            ? "width=device-width, user-scalable=no"
            : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        }
      />
      <SafeAreaContainer>
        <AppContainer>{children}</AppContainer>
      </SafeAreaContainer>
    </>
  )
}

/*

These wrappers copied from OrderApp.tsx

*/

const SafeAreaContainer = styled(Box)`
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left);
  margin-bottom: 200px;
`

const AppContainer: React.FC<React.PropsWithChildren<BoxProps>> = ({
  children,
  maxWidth,
  ...rest
}) => {
  const appShellMaxWidth = maxWidth ?? breakpoints.lg

  return (
    <Box width="100%" mx="auto" maxWidth={appShellMaxWidth} {...rest}>
      {children}
    </Box>
  )
}
