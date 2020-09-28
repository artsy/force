import { Box, Flex, Text, color, space } from "@artsy/palette"
import Icon from "v2/Components/Icon"
import React from "react"
import styled from "styled-components"

interface ArtworkPopoutPanelProps {
  onClose: () => void
  title: string
}

export class ArtworkPopoutPanel extends React.Component<
  ArtworkPopoutPanelProps
> {
  render() {
    return (
      <Container>
        <Box position="absolute" top={space(1)} right={space(1)}>
          <CloseIcon name="close" onClick={this.props.onClose} />
        </Box>
        <Flex flexDirection="column" p={2}>
          <Flex flexDirection="row" mb={2}>
            <Text variant="mediumText" color="black100">
              {this.props.title}
            </Text>
          </Flex>
          {this.props.children}
        </Flex>
      </Container>
    )
  }
}

const Container = styled.div`
  position: absolute;
  width: 300px;
  bottom: 40px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
`

const CloseIcon = styled(Icon)`
  color: ${color("black30")};
  cursor: pointer;
  font-size: 12px;
`
