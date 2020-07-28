import React from "react"
import styled from "styled-components"
import { BorderBox, BorderBoxProps, Box, Separator, Text } from "@artsy/palette"

const Container = styled(BorderBox)`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
`

export type MenuProps = BorderBoxProps & {
  title?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export const Menu: React.FC<MenuProps> = ({ children, title, ...rest }) => {
  return (
    <Container
      width={230}
      p={0}
      py={1}
      bg="white"
      display="flex"
      flexDirection="column"
      {...rest}
    >
      {title && (
        <>
          <Text px={2} pt={1} pb={1} variant="text">
            {title}
          </Text>

          <Box px={2}>
            <Separator />
          </Box>
        </>
      )}

      <Box display="flex" flexDirection="column">
        {children}
      </Box>
    </Container>
  )
}
