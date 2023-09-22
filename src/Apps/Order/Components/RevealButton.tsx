import { Button, Flex } from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { FC, useState } from "react"

export const RevealButton: FC<{
  buttonLabel: string
  align?: "left" | "right"
}> = ({ align, children, buttonLabel }) => {
  const [showing, setShowing] = useState(false)

  return (
    <Flex
      flexDirection="column"
      position="relative"
      style={{ minHeight: "26px" }}
    >
      <Flex
        position="absolute"
        justifyContent={align === "left" ? "flex-start" : "flex-end"}
        style={{
          right: "0",
          left: "0",
          transition: "opacity 0.24s ease",
          opacity: showing ? 0 : 1,
          pointerEvents: showing ? "none" : "all",
        }}
      >
        <Button
          variant="primaryGray"
          size="small"
          onClick={() => setShowing(true)}
        >
          {buttonLabel}
        </Button>
      </Flex>
      <Collapse open={showing}>{children}</Collapse>
    </Flex>
  )
}
