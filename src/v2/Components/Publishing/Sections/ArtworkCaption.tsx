import { color as Color, Sans, Serif } from "@artsy/palette"
import { ErrorBoundary } from "v2/Artsy/Router/ErrorBoundary"
import { pMedia } from "v2/Components/Helpers"
import { ArticleLayout, SectionLayout } from "v2/Components/Publishing/Typings"
import { Truncator } from "v2/Components/Truncator"
import _ from "lodash"
import React from "react"
import styled from "styled-components"

interface ArtworkCaptionProps extends React.HTMLProps<HTMLDivElement> {
  artwork: any
  color?: string
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
  linked?: boolean
  isFullscreenCaption?: boolean
}

export class ArtworkCaption extends React.Component<ArtworkCaptionProps> {
  static defaultProps = {
    color: Color("black30"),
  }

  joinParts(children, key, delimiter = ", ") {
    const compacted = _.compact(children)

    if (compacted.length) {
      const reduced = compacted.reduce((prev, curr, i) => {
        return [
          prev,
          <span key={`joinParts-${key}-${i}`}>{delimiter}</span>,
          curr,
        ]
      })
      return reduced
    } else {
      return []
    }
  }

  joinArtistNames(names, delimiter = ", ") {
    if (names.length === 0) {
      return []
    }

    return names.slice(1).reduce(
      (prev, curr, i) => {
        return prev.concat([
          <span key={`joinArtistNames-${i}`}>{delimiter}</span>,
          curr,
        ])
      },
      [names[0]]
    )
  }

  renderArtists() {
    const {
      artwork: { artist, artists },
    } = this.props

    // Multiple artists
    if (artists && artists.length > 1) {
      const names = artists.map((a, i) => {
        const artistName = this.renderArtistName(a, `renderArtists-${i}`)
        return artistName
      })

      const joinedNames = this.joinArtistNames(names)
      return joinedNames

      // Single artist
    } else if (artist) {
      const artistName = this.renderArtistName(artist, "renderArtists-single")
      return artistName
    }
  }

  renderArtistName(artist, key: string) {
    const { linked } = this.props
    const { name, slug } = artist
    const createTextLink = linked && slug

    if (createTextLink) {
      const href = `/artist/${slug}`

      return (
        <ArtistName key={`renderArtistName-${key}`}>
          <a href={href}>{name}</a>
        </ArtistName>
      )
    } else {
      return (
        <span key={`renderArtistName-${key}`} className="name">
          {name}
        </span>
      )
    }
  }

  renderTitleDate() {
    const children = [this.renderTitle(), this.renderDate()]
    const titleDate = this.joinParts(children, "renderTitleDate")
    return titleDate
  }

  renderTitle() {
    const {
      artwork: { slug, title },
      linked,
    } = this.props

    if (title) {
      if (linked) {
        const href = `/artwork/${slug}`

        return (
          <span key="renderTitle" className="title">
            <a href={href}>{title}</a>
          </span>
        )
      } else {
        return (
          <span key="renderTitle" className="title">
            {title}
          </span>
        )
      }
    }
  }

  renderDate() {
    const {
      artwork: { date },
    } = this.props

    if (date && date.length) {
      return (
        <span key="renderDate" className="date">
          {date}
        </span>
      )
    }
  }

  renderPartner() {
    const {
      artwork: {
        partner: { name, slug },
      },
      linked,
    } = this.props

    if (name) {
      const createTextLink = Boolean(linked && slug)

      if (createTextLink) {
        return (
          <a key="renderPartner" href={`/${slug}`}>
            {name}
          </a>
        )
      } else {
        return name
      }
    }
  }

  renderCredit() {
    const {
      artwork: { credit },
    } = this.props

    if (credit && credit.length) {
      return (
        <span key="renderCredit" className="credit">
          {credit}
        </span>
      )
    }
  }

  renderPartnerCredit = () => {
    const children = [this.renderPartner(), this.renderCredit()]

    const joined = this.joinParts(children, "renderPartnerCredit", ". ")
    return joined
  }

  renderFullscreenCaption = () => {
    return (
      <StyledFullscreenCaption size={["3", "4"]} weight="medium">
        <Line>
          <ArtistNames>{this.renderArtists()}</ArtistNames>
        </Line>
        <div>
          <Line>{this.renderTitleDate()}</Line>
          <Line>{this.renderPartnerCredit()}</Line>
        </div>
      </StyledFullscreenCaption>
    )
  }

  renderClassicCaption = () => {
    return (
      <StyledClassicCaption
        color={Color("black60")}
        size="2"
        className="display-artwork__caption"
      >
        <Truncator>
          <ArtistNames>{this.renderArtists()}</ArtistNames>
          {this.renderTitleDate()}
          {". "}
          {this.renderPartner()}
        </Truncator>
      </StyledClassicCaption>
    )
  }

  renderEditorialCaption = () => {
    const { color, layout, sectionLayout } = this.props

    return (
      <StyledArtworkCaption
        size="3"
        color={color}
        layout={layout}
        sectionLayout={sectionLayout}
      >
        <ArtistNames>{this.renderArtists()}</ArtistNames>
        <div>
          <Truncator>{this.renderTitleDate()}</Truncator>
          <Truncator>{this.renderPartnerCredit()}</Truncator>
        </div>
      </StyledArtworkCaption>
    )
  }

  render() {
    const { layout, isFullscreenCaption } = this.props

    return (
      <ErrorBoundary>
        <div>
          {isFullscreenCaption
            ? this.renderFullscreenCaption()
            : layout === "classic"
              ? this.renderClassicCaption()
              : this.renderEditorialCaption()}
        </div>
      </ErrorBoundary>
    )
  }
}

const ArtistNames = styled.span`
  margin-right: 30px;
`

const ArtistName = styled.span`
  white-space: nowrap;
`

export const StyledArtworkCaption = styled(Sans) <{
  color?: string
  layout?: ArticleLayout
  sectionLayout?: SectionLayout
}>`
  padding: ${props => (props.sectionLayout === "fillwidth" ? "0 10px;" : "0;")};
  margin-top: 10px;
  display: flex;

  a {
    color: ${props => props.color};
    text-decoration: none;
  }

  .title,
  .title a {
    font-style: italic;
  }

  ${pMedia.xs`
    padding: 0 10px;
  `};
`

const StyledClassicCaption = styled(Serif) <{
  className?: string
  color?: string
}>`
  margin-top: 10px;
  display: block;

  a {
    color: ${props => props.color};
    text-decoration: none;
  }

  ${ArtistNames} {
    margin-right: 0;
    font-weight: bold;

    &::after {
      content: ", ";
    }
  }

  .title {
    font-style: italic;
  }
`

const StyledFullscreenCaption = styled(Sans)`
  display: flex;

  a {
    color: black;
    text-decoration: none;
  }

  .title,
  .title a {
    font-style: italic;
  }

  ${pMedia.sm`
    flex-direction: column;
  `};
`

const Line = styled.div`
  ${pMedia.sm`
    &.artist-name {
      margin-bottom: 5px;
    }
  `};
`
