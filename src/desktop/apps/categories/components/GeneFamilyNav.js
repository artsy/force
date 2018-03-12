import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Scrollspy from 'react-scrollspy'

import colors from 'reaction/Assets/Colors'
import { primary } from 'reaction/Assets/Fonts'
import FrameAnimator from 'desktop/components/frame_animator'

const propTypes = {
  geneFamilies: PropTypes.array.isRequired,
}

// amount by which to adjust scrolling & spying,
// in order to account for header and whitespace
const TOP_BUFFER = 90

const ResponsiveSidebar = styled.aside`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 24%;
    overflow: hidden;
    padding-top: 0.5em;
  }
`

const GeneFamilyList = styled(Scrollspy)`
  position: fixed;
  width: inherit;
  max-width: 300px;
  padding-right: 2em;
  background: white;
  z-index: 1;

  ${primary.style};
  font-size: 13px;
  line-height: 1.33em;
`

const GeneFamilyItem = styled.li`
  margin-bottom: 1em;
  &.is-current a {
    color: ${colors.purpleRegular};
  }
`

const GeneFamilyLink = styled.a`
  transition: color 0.125s;
  text-decoration: none;

  &:hover {
    color: ${colors.purpleRegular};
  }
`

class GeneFamilyNav extends React.Component {
  handleClick = (e) => {
    e.preventDefault()
    const id = e.target.hash
    const section = document.querySelector(id)
    const scroller = new FrameAnimator(
      (val) => {
        window.scrollTo(0, val)
      },
      {
        duration: 600,
        startValue: window.scrollY,
        endValue: section.offsetTop - TOP_BUFFER,
      }
    )
    scroller.start()
  }

  render() {
    const { geneFamilies } = this.props
    return (
      <ResponsiveSidebar>
        <GeneFamilyList
          items={geneFamilies.map((f) => f.id)}
          currentClassName="is-current"
          offset={-1 * TOP_BUFFER}
        >
          {geneFamilies.map((geneFamily) => (
            <GeneFamilyItem key={geneFamily.id}>
              <GeneFamilyLink
                href={`#${geneFamily.id}`}
                onClick={this.handleClick}
              >
                {geneFamily.name}
              </GeneFamilyLink>
            </GeneFamilyItem>
          ))}
        </GeneFamilyList>
      </ResponsiveSidebar>
    )
  }
}

GeneFamilyNav.propTypes = propTypes

export default GeneFamilyNav
