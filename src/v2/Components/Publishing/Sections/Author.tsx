import { Box, Flex, Sans, space } from "@artsy/palette"
import { pMedia } from "v2/Components/Helpers"
import Icon from "v2/Components/Icon"
import React from "react"
import Markdown from "react-markdown"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"

interface AuthorProps {
  author: any
  color?: string
}

export const Author: React.SFC<AuthorProps> = ({ author, color = "black" }) => {
  const profileImage = author.image_url ? (
    <ProfileImage mr={20} src={resize(author.image_url, { width: 200 })} />
  ) : (
      false
    )
  return (
    <AuthorContainer color={color} mb={20} alignItems="center">
      {profileImage}
      <Sans size="4" weight="medium">
        <AuthorInfo>
          {author.bio && author.bio.length ? (
            <Markdown
              source={author.bio}
              disallowedTypes={["Paragraph"]}
              unwrapDisallowed
              containerTagName="span"
            />
          ) : (
              <div>{author.name}</div>
            )}
        </AuthorInfo>

        {author.twitter_handle && author.twitter_handle.length ? (
          <span>
            <TwitterHandle href={`http://twitter.com/${author.twitter_handle}`}>
              <Icon name="twitter" color={color} />
              {`@${author.twitter_handle}`}
            </TwitterHandle>
          </span>
        ) : (
            false
          )}
      </Sans>
    </AuthorContainer>
  )
}

const ProfileImage = styled(Box) <{ src?: string }>`
  min-width: 60px;
  min-height: 60px;
  border-radius: 50%;
  background: url(${props => props.src || ""}) no-repeat center center;
  background-size: cover;

  ${pMedia.xs`
    min-width: 40px;
    min-height: 40px;
  `};
`

const AuthorContainer = styled(Flex) <{ color: string }>`
  color: ${props => props.color};

  a {
    color: ${props => props.color};
  }
`

const AuthorInfo = styled.span`
  margin-right: ${space(2)}px;
`

const TwitterHandle = styled.a`
  text-decoration: none;
  white-space: nowrap;

  ${Icon} {
    vertical-align: middle;
    margin: 0;
  }
`
