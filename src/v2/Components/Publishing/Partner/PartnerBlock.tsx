import { unica } from "v2/Assets/Fonts"
import { pMedia } from "v2/Components/Helpers"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"

interface Props {
  logo: string
  url: string
  tracking?: TrackingProp
  trackingData?: any
}

@track()
export class PartnerBlock extends React.Component<Props, null> {
  static defaultProps = {}

  @track(props => ({
    action: "Click",
    type: "external_link",
    destination_path: props.url,
  }))
  onPartnerClick(event) {
    // noop
  }

  render() {
    const { logo, url } = this.props
    const resized_logo = resize(logo, { width: 240 })
    const image = <img src={resized_logo} />

    return (
      <PartnerBlockContainer className="PartnerBlock">
        {logo && <Title>Presented in Partnership with</Title>}
        {image && (
          <ImageContainer>
            {url ? (
              <a
                href={url}
                target="_blank"
                onClick={this.onPartnerClick.bind(this)}
              >
                {image}
              </a>
            ) : (
                image
              )}
          </ImageContainer>
        )}
      </PartnerBlockContainer>
    )
  }
}

export const PartnerBlockContainer = styled.div`
  display: block;
`

export const ImageContainer = styled.div`
  img {
    max-width: 240px;
    max-height: 40px;
    object-fit: contain;
    object-position: left;
  }
`

const Title = styled.div`
  ${unica("s16", "medium")};
  margin-bottom: 20px;

  ${pMedia.sm`
    ${unica("s14", "medium")}
  `};
`
