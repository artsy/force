import { Button, Collapse, Flex } from "@artsy/palette"
import { Component } from "react"

interface RevealButtonProps {
  buttonLabel: string
  align?: "left" | "right"
}

interface RevealButtonState {
  showing: boolean
}

export class RevealButton extends Component<
  RevealButtonProps,
  RevealButtonState
> {
  state: RevealButtonState = { showing: false }

  render() {
    const { align, children, buttonLabel } = this.props
    const { showing } = this.state
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
            onClick={() => {
              this.setState({ showing: true })
            }}
          >
            {buttonLabel}
          </Button>
        </Flex>
        <Collapse open={this.state.showing}>{children}</Collapse>
      </Flex>
    )
  }
}
