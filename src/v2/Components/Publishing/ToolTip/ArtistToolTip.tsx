import { ArtistToolTip_artist } from "v2/__generated__/ArtistToolTip_artist.graphql"
import { garamond, unica } from "v2/Assets/Fonts"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import { map } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import fillwidthDimensions from "../../../Utils/fillwidth"
import { FollowTrackingData } from "../../FollowButton/Typings"
import { ToolTipDescription } from "./Components/Description"

export interface ArtistToolTipProps {
  artist: ArtistToolTip_artist
  tracking?: TrackingProp
}

export class ArtistToolTip extends React.Component<ArtistToolTipProps> {
  static contextTypes = {
    tooltipsData: PropTypes.object,
    onOpenAuthModal: PropTypes.func,
  }

  trackClick = () => {
    const { tracking } = this.props
    const { href } = this.props.artist

    tracking.trackEvent({
      action: "Click",
      flow: "tooltip",
      type: "artist stub",
      contextModule: "intext tooltip",
      destination_path: href,
    })
  }

  renderArtistGenes = () => {
    const { genes } = this.props.artist

    if (genes.length) {
      return map(genes, "name").join(", ")
    }
  }

  render() {
    const { artist } = this.props
    const {
      blurb,
      carousel,
      formatted_nationality_and_birthday,
      href,
      slug,
      internalID,
      name,
    } = artist
    const {
      tooltipsData: { artists },
      onOpenAuthModal,
    } = this.context
    const displayImages = map(carousel.images.slice(0, 2), "resized")
    const images = fillwidthDimensions(displayImages, 320, 15, 150)
    const description = blurb || this.renderArtistGenes()

    const trackingData: FollowTrackingData = {
      contextModule: "intext tooltip",
      entity_id: internalID,
      entity_slug: slug,
      entity_type: "artist",
    }

    return (
      <Wrapper data-test="artistTooltip">
        <ArtistContainer>
          {images && (
            <Images href={href} onClick={this.trackClick}>
              {images.map((img, i) => (
                <div key={i}>
                  <img src={img.id} />
                </div>
              ))}
            </Images>
          )}

          <Header>
            <TitleDate href={href} target="_blank" onClick={this.trackClick}>
              <Title>{name}</Title>
              {formatted_nationality_and_birthday && (
                <Date>{formatted_nationality_and_birthday}</Date>
              )}
            </TitleDate>
            <FollowArtistButton
              artist={artists[slug]}
              trackingData={trackingData}
              onOpenAuthModal={onOpenAuthModal}
            />
          </Header>

          <a href={href} target="_blank" onClick={this.trackClick}>
            {description && <ToolTipDescription text={description} />}
          </a>
        </ArtistContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 320px;
`

export const ArtistContainer = styled.div`
  position: relative;

  a {
    text-decoration: none;
    color: black;

    &:hover {
      color: black;
    }
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`

export const TitleDate = styled.a`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${garamond("s18")};
  font-weight: 600;
`

const Date = styled.div`
  ${unica("s14", "medium")};
`

const Images = styled.a`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  div:first-child {
    margin-right: 15px;
  }

  img {
    width: 100%;
    height: auto;
  }
`

export const ArtistTooltipContainer = track({})(
  createFragmentContainer(ArtistToolTip, {
    artist: graphql`
      fragment ArtistToolTip_artist on Artist {
        name
        slug
        internalID
        formatted_nationality_and_birthday: formattedNationalityAndBirthday
        href
        blurb
        carousel {
          images {
            resized(height: 200) {
              url
              width
              height
            }
          }
        }
        genes {
          name
        }
      }
    `,
  })
)
