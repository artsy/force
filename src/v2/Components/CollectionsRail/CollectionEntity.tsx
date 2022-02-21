import { Box, Link, Sans, Serif, color } from "@artsy/palette"
import { CollectionEntity_collection$data } from "v2/__generated__/CollectionEntity_collection.graphql"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import currency from "currency.js"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import { resize } from "v2/Utils/resizer"

export interface CollectionProps {
  collection: CollectionEntity_collection$data
}

export const Background = styled(Box)<{ collectionImage: string }>`
  height: 175px;
  width: 100%;
  background: ${color("black30")};
  background-image: url(${props => props.collectionImage});
  display: inline-flex;
  position: relative;
  background-size: cover;
  background-position: center;
`

const CollectionTitle = styled(Serif)`
  width: max-content;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`

@track()
export class CollectionEntity extends Component<CollectionProps> {
  @track<CollectionProps>(({ collection }) => ({
    action_type: Schema.ActionType.Click,
    context_module: Schema.ContextModule.CollectionsRail,
    context_page_owner_type: Schema.OwnerType.Article,
    destination_path: `${sd.APP_URL}/collection/${collection.slug}`,
    type: Schema.Type.Thumbnail,
  }))
  onLinkClick() {
    // noop
  }

  render() {
    const { collection } = this.props
    return (
      <Box mb={3} width="100%">
        <StyledLink
          href={`${sd.APP_URL}/collection/${collection.slug}`}
          onClick={this.onLinkClick.bind(this)}
        >
          <Background
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            collectionImage={resize(collection.headerImage, {
              width: 645,
              height: 275,
              quality: 80,
            })}
          />
          <CollectionTitle size="4">{collection.title}</CollectionTitle>
          <Sans size="2">
            Works from $
            {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
            {currency(collection.price_guidance, {
              separator: ",",
              precision: 0,
            }).format()}
          </Sans>
        </StyledLink>
      </Box>
    )
  }
}

export const CollectionEntityFragmentContainer = createFragmentContainer(
  CollectionEntity,
  {
    collection: graphql`
      fragment CollectionEntity_collection on MarketingCollection {
        slug
        headerImage
        title
        price_guidance: priceGuidance
        show_on_editorial: showOnEditorial
      }
    `,
  }
)
