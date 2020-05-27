import { Box, Separator, color } from "@artsy/palette"
import React from "react"

export const Header: React.SFC<any> = () => {
  return (
    <Box height={100} mb={30} mt={120} pr={[0, 20]} pl={[0, 20]}>
      <Box pl={[20, 0]}>
        <Box mb={40} background={color("black10")} width={260} height={20} />
        <Box
          width={80}
          height={17}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={17}
          mr={3}
          display="inline-block"
          background={color("black10")}
        />
        <Box
          width={80}
          height={17}
          mr={3}
          display={["none", "inline-block"]}
          background={color("black10")}
        />
        <Box
          width={80}
          height={17}
          mr={3}
          display={["none", "inline-block"]}
          background={color("black10")}
        />
        <Box
          width={80}
          height={17}
          mr={3}
          display={["none", "inline-block"]}
          background={color("black10")}
        />
        <Box
          width={80}
          height={17}
          mr={3}
          display={["none", "inline-block"]}
          background={color("black10")}
        />
      </Box>
      <Separator mt={10} />
    </Box>
  )
}
