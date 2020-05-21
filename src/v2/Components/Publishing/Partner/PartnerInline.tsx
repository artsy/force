import { pMedia } from "v2/Components/Helpers"
import Icon from "v2/Components/Icon"
import { IconPlus } from "v2/Components/Publishing/Icon/IconPlus"
import React from "react"
import track from "react-tracking"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"

interface Props {
  color?: string
  logo: string
  url: string
  trackingData?: any
  margin?: string
}

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  margin: string
}

@track()
export class PartnerInline extends React.Component<Props, null> {
  static defaultProps = {
    margin: "0px",
  }

  @track(props => ({
    action: "Click",
    type: "external_link",
    destination_path: props.url,
  }))
  onPartnerClick(event) {
    // noop
  }

  render() {
    const { color, logo, url, margin } = this.props
    const resized_logo = logo ? resize(logo, { width: 240 }) : ""

    return (
      <PartnerInlineContainer margin={margin} className="PartnerInline">
        <a href="/">
          <Icon name="logo" color={color ? color : "black"} fontSize="32px" />
        </a>
        {resized_logo && (
          <>
            <IconPlus color={color} />
            <a
              href={url}
              target="_blank"
              onClick={this.onPartnerClick.bind(this)}
            >
              <img src={resized_logo} />
            </a>
          </>
        )}
      </PartnerInlineContainer>
    )
  }
}

const PartnerInlineContainer = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  margin: ${(props: DivProps) => props.margin};

  img {
    max-height: 34px;
    vertical-align: middle;
    /* stylelint-disable-next-line */
    -ms-interpolation-mode: bicubic;
  }

  ${IconPlus} {
    margin: 0 20px;
  }

  ${Icon} {
    margin: 0;
    vertical-align: middle;
  }
  ${pMedia.sm`
    img {
      max-height: 24px;
    }
    ${Icon} {
      font-size: 24px;
    }
    ${IconPlus} {
      margin: 0 10px;
    }
  `};
`
