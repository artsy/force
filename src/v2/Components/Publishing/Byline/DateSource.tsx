import { unica } from "v2/Assets/Fonts"
import React, { Component, Fragment } from "react"
import track from "react-tracking"
import styled from "styled-components"
import colors from "../../../Assets/Colors"
import { pMedia } from "../../Helpers"
import { getDate } from "../Constants"
import { NewsBylineProps } from "./NewsByline"

interface Props extends NewsBylineProps {
  editSource?: any
}

@track()
export class DateSource extends Component<Props> {
  constructor(props: Props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  @track(props => ({
    action: "Click",
    type: "external link",
    label: "news source",
    destination_path: props.article.news_source.url,
  }))
  onClick() {
    // noop
  }

  getNewsSource = source => {
    const { editSource } = this.props
    const hasSource = source && (source.url || source.title)
    if (!editSource && !hasSource) return null

    return (
      <Fragment>
        {hasSource && ", via"}
        &nbsp;
        {editSource ? (
          editSource
        ) : source.url ? (
          <a href={source.url} target="_blank" onClick={this.onClick}>
            {source.title}
          </a>
        ) : (
              source.title
            )}
      </Fragment>
    )
  }

  render() {
    const { news_source, published_at } = this.props.article
    return (
      <DateSourceContainer>
        {getDate(published_at || new Date().toISOString(), "verbose")}
        {this.getNewsSource(news_source)}
      </DateSourceContainer>
    )
  }
}

const DateSourceContainer = styled.div`
  display: flex;
  ${unica("s14")};

  /* stylelint-disable-next-line */
  ${pMedia.sm`
    ${unica("s12")}
  `} a {
    color: ${colors.grayDark};
  }
  color: ${colors.grayDark};
`
