import * as React from 'react'
import ChannelMemberQuery from 'desktop/apps/article/queries/channelMember'
import PropTypes from 'prop-types'
import { positronql as _positronql } from 'desktop/lib/positronql'
import styled from 'styled-components'
import { data as _sd } from 'sharify'
import { pluck, contains } from 'underscore'

// NOTE: Required to enable rewire hooks in tests
// TODO: Refactor with jest
// FIXME: Rewire
let sd = _sd
let positronql = _positronql

export class EditButton extends React.Component {
  static propTypes = {
    channelId: PropTypes.string,
    slug: PropTypes.string,
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
    if (!this.state.hasButtonState || !this.state.showEditButton) {
      return false
    } else {
      return (
        <StyledEditButton
          target="_blank"
          href={`${sd.POSITRON_URL}/articles/${this.props.slug}/edit`}
        >
          <i className="icon-with-black-circle icon-edit" />
        </StyledEditButton>
      )
    }
  }
}

const StyledEditButton = styled.a`
  position: fixed;
  top: 75px;
  right: 20px;
`
