import React from "react"
import ChannelMemberQuery from "desktop/apps/article/queries/channelMember"
import { positronql } from "desktop/lib/positronql"
import { data as sd } from "sharify"
import { includes, map } from "lodash"
import { Box, space } from "@artsy/palette"

interface EditButtonProps {
  channelId?: string
  slug: string
  positionTop?: number
}

interface EditButtonState {
  hasButtonState: boolean
  showEditButton: boolean
}

export class EditButton extends React.Component<
  EditButtonProps,
  EditButtonState
> {
  state = {
    hasButtonState: false,
    showEditButton: false,
  }

  componentDidMount = async () => {
    const userId = sd.CURRENT_USER && sd.CURRENT_USER.id
    if (!userId) {
      return this.setState({ showEditButton: false, hasButtonState: true })
    }
    const data = await positronql({ query: ChannelMemberQuery(userId) })
    if (includes(map(data.channels, "id"), this.props.channelId)) {
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
        <Box top={`${positionTop || 75}px`} position="fixed" right={space(2)}>
          <a target="_blank" href={`${sd.POSITRON_URL}/articles/${slug}/edit`}>
            <i className="icon-with-black-circle icon-edit" />
          </a>
        </Box>
      )
    }
  }
}
