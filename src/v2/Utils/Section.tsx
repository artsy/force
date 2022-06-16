import { Flex, Sans, color, themeProps } from "@artsy/palette"
import { Component, Fragment } from "react";
import styled from "styled-components"

const Header = styled.div`
  padding: 5px 10px 3px;
  border-bottom: 1px solid ${color("black10")};
  user-select: none;
  transition: 0.4s;

  &:hover {
    background-color: ${color("black5")};
  }
`

export interface SectionProps {
  title?: string
}

export class Section extends Component<SectionProps> {
  state = {
    expanded: true,
  }
  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const maxWidth = themeProps.grid.breakpoints.xl

    return (
      <Fragment>
        <Header onClick={this.toggleExpand}>
          <Flex justifyContent="space-between">
            <Sans size="4" color="black60">
              {this.props.title}
            </Sans>
            <Flex width={2} justifyContent="center">
              <Sans size="6" color="black60">
                {this.state.expanded ? "-" : "+"}
              </Sans>
            </Flex>
          </Flex>
        </Header>
        {this.state.expanded && (
          <Flex
            flexDirection="column"
            alignItems="center"
            my={2}
            mx={1}
            maxWidth={maxWidth}
          >
            {this.props.children}
          </Flex>
        )}
      </Fragment>
    );
  }
}
