import styled from "styled-components"
import { Component } from "react";
import { SectionsNav } from "./sections_nav"
import { Header } from "./header"
import { color } from "@artsy/palette"

interface FixedHeaderProps {
  activeSection: number
  curation: any
  isOpen: boolean
  isVisible: boolean
  onChangeSection: (index: number) => void
}

interface FixedHeaderState {
  isOpen: boolean
  scrollPosition: number
}

export class FixedHeader extends Component<FixedHeaderProps, FixedHeaderState> {
  state = {
    isOpen: false,
    scrollPosition: 0,
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll)

    let isOpen = false
    if (this.props.isOpen) {
      isOpen = true
    }
    this.setState({
      scrollPosition: document.documentElement.scrollTop,
      isOpen,
    })
  }

  onScroll = () => {
    const { scrollPosition, isOpen } = this.state
    const fromTop = document.documentElement.scrollTop
    let setOpen = isOpen

    if (fromTop > scrollPosition) {
      setOpen = false
    } else {
      setOpen = true
    }
    if (fromTop !== scrollPosition) {
      this.setState({ scrollPosition: fromTop, isOpen: setOpen })
    }
  }

  render() {
    const { isOpen } = this.state
    const { activeSection, curation, isVisible, onChangeSection } = this.props

    const { name, partner_logo_primary, partner_link_url } = curation

    return (
      <FixedHeaderContainer
        isVisible={isVisible}
        onMouseEnter={() => this.setState({ isOpen: true })}
        onMouseLeave={() => this.setState({ isOpen: false })}
      >
        <Header
          title={name}
          isOpen={isOpen}
          partner_logo={partner_logo_primary}
          partner_url={partner_link_url}
          onOpenMenu={() => this.setState({ isOpen: !isOpen })}
        />
        {isOpen && (
          <SectionsNav
            animated
            activeSection={activeSection}
            sections={curation.sections}
            onClick={onChangeSection}
          />
        )}
      </FixedHeaderContainer>
    )
  }
}

const FixedHeaderContainer = styled.div<{ isVisible: boolean }>`
  width: 100%;
  padding: 15px 20px;
  background: white;
  position: fixed;
  z-index: 100;
  transition: opacity 0.25s;
  opacity: ${props => (props.isVisible ? "1" : "0")};
  border-bottom: 1px solid ${color("black10")};
`
