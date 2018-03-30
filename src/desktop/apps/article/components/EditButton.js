import * as React from 'react'
import ChannelMemberQuery from 'desktop/apps/article/queries/channelMember'
import PropTypes from 'prop-types'
import { positronql as _positronql } from 'desktop/lib/positronql'
import styled from 'styled-components'
import { data as _sd } from 'sharify'
import { pluck, contains } from 'underscore'

// FIXME: Rewire
let sd = _sd
let positronql = _positronql

export class EditButton extends React.Component {
  static propTypes = {
    channelId: PropTypes.string,
    slug: PropTypes.string,
    positionTop: PropTypes.number,
  }

  state = {
    hasButtonState: false,
  }

  componentDidMount = async () => {
    const userId = sd.CURRENT_USER && sd.CURRENT_USER.id
    if (!userId) {
      return this.setState({ showEditButton: false, hasButtonState: true })
    }
    const data = await positronql({ query: ChannelMemberQuery(userId) })
    if (contains(pluck(data.channels, 'id'), this.props.channelId)) {
      this.setState({ showEditButton: true, hasButtonState: true })
    } else {
      this.setState({ showEditButton: false, hasButtonState: true })
    }
  }

  render() {
    const { hasButtonState, showEditButton } = this.state
    const { positionTop, slug } = this.props

    if (!hasButtonState || !showEditButton) {
      return false
    } else {
      return (
        <StyledEditButton
          target="_blank"
          href={`${sd.POSITRON_URL}/articles/${slug}/edit`}
          positionTop={positionTop}
        >
          <i className="icon-with-black-circle icon-edit" />
        </StyledEditButton>
      )
    }
  }
}

const StyledEditButton = styled.a`
  top: ${(props) => (props.positionTop ? `${props.positionTop}px` : `75px`)};
  position: fixed;
  right: 20px;
`
