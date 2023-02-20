import { Column, GridColumns, ResponsiveBox, Box } from "@artsy/palette"
import { ReactElement } from "react"

export const TextAndImageLayout: React.FC<{
  text: ReactElement
  button: ReactElement
  image: ReactElement
}> = ({ text, button, image }) => {
  return (
    <Box
      mx={[-2, -4]}
      pt={[4, 6, 12]}
      pb={[0, 6, 12]}
      backgroundColor="black100"
    >
      <GridColumns alignItems="center">
        <Column span={6} py={[0, 2]} pr={[2, 2]} pl={[2, 4]}>
          {text}
          {button}
        </Column>

        <Column span={6} order={[1, 0]}>
          <ResponsiveBox aspectWidth={950} aspectHeight={419} maxWidth="100%">
            {image}
          </ResponsiveBox>
        </Column>
      </GridColumns>
    </Box>
  )
}
