import { Dropdown_aggregation } from "v2/__generated__/Dropdown_aggregation.graphql"
import { find } from "lodash"
import numeral from "numeral"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import colors from "../../Assets/Colors"
import { avantgarde, garamond } from "../../Assets/Fonts"
import Icon from "../Icon"
import { labelMap } from "./ParamMap"

interface DropdownProps extends React.HTMLProps<Dropdown> {
  aggregation: Dropdown_aggregation
  onSelected?: (slice: string, value: string) => void
  selected?: any
}

interface DropdownState {
  isHovered: boolean
  selected: any
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props)
    this.state = {
      isHovered: false,
      selected: props.selected || {},
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.selected })
  }

  toggleHover(value) {
    this.setState({
      isHovered: value,
    })
  }

  onSelect(slice: string, value: string) {
    this.setState({
      selected: value,
      isHovered: false,
    })
    this.props.onSelected(slice, value)
  }

  getSelectedName(value) {
    const selectedCount = find(
      this.props.aggregation.counts,
      count => count.value === value
    )
    return selectedCount ? selectedCount.name : null
  }

  render() {
    const slice = this.props.aggregation.slice
    const labels = labelMap[this.props.aggregation.slice.toLowerCase()]
    const selectedName = this.getSelectedName(this.state.selected)

    const navItems = this.props.aggregation.counts.map(count => {
      return (
        <NavItem
          key={count.value}
          onClick={() => this.onSelect(slice, count.value)}
        >
          <span>{count.name}</span>
          <NavItemCount>
            &nbsp;(
            {numeral(count.count).format("0,0")})
          </NavItemCount>
        </NavItem>
      )
    })

    navItems.unshift(
      <NavItem key="all" onClick={() => this.onSelect(slice, "*")}>
        <span>All {labels.plural}</span>
      </NavItem>
    )

    let buttonColor = "white"
    let buttonTextColor = "black"
    let superLabelColor = "black"
    let navStyle = { display: "none" }

    if (selectedName) {
      buttonTextColor = colors.purpleRegular
    }

    if (this.state.isHovered) {
      buttonColor = "black"
      buttonTextColor = "white"
      superLabelColor = "white"
      navStyle = { display: "block" }
    }

    const labelText = selectedName || labels.label
    const superLabelText = selectedName ? labels.label : null

    return (
      <div
        className={this.props.className}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <Button
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
        >
          {superLabelText && (
            <SuperLabel style={{ color: superLabelColor }}>
              {superLabelText}
            </SuperLabel>
          )}
          {labelText}
          <Icon
            name="arrow-down"
            fontSize="9px"
            color={buttonTextColor}
            style={{ position: "absolute", right: 15, lineHeight: "inherit" }}
          />
        </Button>
        <Nav style={navStyle}>{navItems}</Nav>
      </div>
    )
  }
}

const Button = styled.div`
  ${avantgarde("s13")};
  background: white;
  color: black;
  border: 1px solid ${colors.grayRegular};
  display: inline-block;
  line-height: 160%;
  padding: 15px 35px 15px 18px;
  vertical-align: middle;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Nav = styled.div`
  z-index: 2;
  background: black;
  position: absolute;
  top: 45px;
  left: 1px;
  width: 300px;
  border: 1px solid #333;
`

const SuperLabel = styled.div`
  position: absolute;
  font-size: 9px;
  margin-top: -15px;
  color: black;
`

const NavItem = styled.div`
  ${garamond("s11")};
  text-align: left;
  color: white;
  display: block;
  border-bottom: 1px solid #333;
  padding: 15px 18px 10px 18px;
  text-transform: capitalize;

  &:hover {
    background: ${colors.grayBold};
  }
`
const NavItemCount = styled.span`
  color: ${colors.graySemibold};
`

const StyledDropdown = styled(Dropdown)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-left: -1px;
`

export default createFragmentContainer(StyledDropdown, {
  aggregation: graphql`
    fragment Dropdown_aggregation on ArtworksAggregationResults {
      slice
      counts {
        name
        value
        count
      }
    }
  `,
})
