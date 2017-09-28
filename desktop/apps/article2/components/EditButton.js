import { pluck, contains } from 'underscore'
import * as React from 'react'
import { data as sd } from 'sharify'
import ChannelMemberQuery from 'desktop/apps/article2/queries/channelMember'
import positronql from 'desktop/lib/positronql.coffee'
import styled from 'styled-components'

export default class EditButton extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
  }

  render() {
    const userId = sd.CURRENT_USER && sd.CURRENT_USER.id
    console.log(userId)
    if (!userId) {
      return false
    } else {
      const data = await positronql({ query: ChannelMemberQuery(userId) })
      if (contains(pluck(data.channels, 'id'), props.channelId)) {
        return (
          <StyledEditButton href={`${sd.POSITRON_URL}/articles/${props.slug}/edit2`}>
            <i className='icon-with-black-circle icon-edit' />
          </StyledEditButton>
        )
      } else {
        return false
      }
    }
  }
}

const StyledEditButton = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
`
