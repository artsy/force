import "isomorphic-fetch"
import jsonp from "jsonp"
import React from "react"
import EmbedContainer from "react-oembed-container"
import styled from "styled-components"
import { SectionData } from "../Typings"

export interface SocialEmbedProps {
  section: SectionData
}

interface SocialEmbedState {
  html: string
}

const TWITTER_EMBED_URL = "https://publish.twitter.com/oembed"
const INSTAGRAM_EMBED_URL = "https://api.instagram.com/oembed"

export class SocialEmbed extends React.Component<
  SocialEmbedProps,
  SocialEmbedState
> {
  state = { html: "" }

  componentDidMount() {
    const url = this.getEmbedUrl()

    if (url) {
      if (url.includes("instagram")) {
        this.getInstagramEmbed(url)
      } else {
        this.getTwitterEmbed(url)
      }
    }
  }

  getTwitterEmbed = url => {
    jsonp(url, (err, data) => {
      if (err) {
        return
      }
      this.setState({ html: data.html })
    })
  }

  getInstagramEmbed = url => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({ html: data.html })
      })
      .catch(err => {
        console.log(err)
        return
      })
  }

  getEmbedUrl = () => {
    const { url } = this.props.section

    if (url.match("twitter")) {
      return TWITTER_EMBED_URL + `?url=${url}`
    } else if (url.match("insta")) {
      return INSTAGRAM_EMBED_URL + `?url=${url}`
    }
  }

  render() {
    const { html } = this.state

    if (html) {
      return (
        <StyledEmbedContainer markup={html}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledEmbedContainer>
      )
    } else {
      return false
    }
  }
}

const StyledEmbedContainer = styled(EmbedContainer)`
  width: 100%;
  max-width: 560px;
  margin: auto;

  twitterwidget {
    margin-left: auto;
    margin-right: auto;
  }
`
