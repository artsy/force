import { GeneSearchResults_viewer$data } from "v2/__generated__/GeneSearchResults_viewer.graphql"
import {
  GeneSearchResultsFollowGeneMutation,
  GeneSearchResultsFollowGeneMutation$data,
} from "v2/__generated__/GeneSearchResultsFollowGeneMutation.graphql"
import { GeneSearchResultsQuery } from "v2/__generated__/GeneSearchResultsQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { garamond } from "v2/Assets/Fonts"
import * as React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import ReplaceTransition from "../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../ItemLink"

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
type Gene = GeneSearchResults_viewer["match_gene"]["edges"][number]["node"]

interface ContainerProps {
  onGeneFollow
  onNoResults
  term: string
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  relay?: RelayProp
  viewer: GeneSearchResults_viewer$data
}

const NoResultsContainer = styled.div`
  ${garamond("s17")};
  text-align: center;
  font-style: italic;
  border-bottom: none;
  font-weight: lighter;
`

class GeneSearchResultsContent extends React.Component<Props, null> {
  private excludedGeneIds: Set<string>

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.viewer.match_gene.edges.map(({ node }) => node.internalID)
    )
  }

  onGeneFollowed(
    gene: Gene,
    store: RecordSourceSelectorProxy,
    data: GeneSearchResultsFollowGeneMutation$data,
    follow: boolean
  ): void {
    this.props.onGeneFollow(follow, gene)

    const suggestedGene = store.get(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      data.followGene.gene.similar.edges[0].node.id
    )
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    this.excludedGeneIds.add(suggestedGene.getValue("internalID") as string)

    const suggestedGenesRootField = store.get("client:root:viewer")
    const suggestedGenes =
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      suggestedGenesRootField.getLinkedRecords("match_gene", {
        term: this.props.term,
      }) || []
    const updatedSuggestedGenes = suggestedGenes.map(geneItem =>
      geneItem.getValue("id") === gene.id ? suggestedGene : geneItem
    )

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    suggestedGenesRootField.setLinkedRecords(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      updatedSuggestedGenes,
      "match_gene",
      { term: this.props.term }
    )
  }

  followedGene(gene: Gene, follow: boolean) {
    this.excludedGeneIds.add(gene.internalID)

    commitMutation<GeneSearchResultsFollowGeneMutation>(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.relay.environment,
      {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation GeneSearchResultsFollowGeneMutation(
            $input: FollowGeneInput!
            $excludedGeneIds: [String]!
          ) {
            followGene(input: $input) {
              gene {
                similar(first: 1, excludeGeneIDs: $excludedGeneIds) {
                  edges {
                    node {
                      slug
                      internalID
                      id
                      name
                      image {
                        cropped(width: 100, height: 100) {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            geneID: gene.internalID,
            unfollow: !follow,
          },
          excludedGeneIds: Array.from(this.excludedGeneIds),
        },
        updater: (store, data) =>
          this.onGeneFollowed(gene, store, data, follow),
      }
    )
  }

  render() {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const items = this.props.viewer.match_gene.edges.map(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      ({ node: item }, index) => {
        const imageUrl = get(item, i => i.image.cropped.url)
        return (
          <LinkContainer key={`gene-search-results-${index}`}>
            <ReplaceTransition
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={400}
            >
              <ItemLink
                href="#"
                item={item}
                key={item.id}
                id={item.slug}
                name={item.name}
                image_url={imageUrl}
                onFollow={selected => this.followedGene(item, selected)}
              />
            </ReplaceTransition>
          </LinkContainer>
        )
      }
    )

    if (items.length === 0) {
      this.props.onNoResults()
      return <NoResultsContainer>No Results Found</NoResultsContainer>
    }

    return <div>{items}</div>
  }
}

export const GeneSearchResultsContentContainer = createFragmentContainer(
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  GeneSearchResultsContent,
  {
    viewer: graphql`
      fragment GeneSearchResults_viewer on Viewer {
        match_gene: searchConnection(
          query: $term
          mode: AUTOSUGGEST
          entities: [GENE]
          first: 10
        ) {
          edges {
            node {
              ... on Gene {
                name
                id
                slug
                internalID
                image {
                  cropped(width: 100, height: 100) {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)

const GeneSearchResultsComponent: React.SFC<
  ContainerProps & SystemContextProps
> = ({ onGeneFollow, onNoResults, relayEnvironment, term }) => {
  return (
    <SystemQueryRenderer<GeneSearchResultsQuery>
      environment={relayEnvironment}
      query={graphql`
        query GeneSearchResultsQuery($term: String!) {
          viewer {
            ...GeneSearchResults_viewer
          }
        }
      `}
      variables={{ term }}
      render={({ error, props }) => {
        if (props) {
          return (
            <GeneSearchResultsContentContainer
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              onGeneFollow={onGeneFollow}
              onNoResults={onNoResults}
              term={term}
              viewer={props.viewer!}
            />
          )
        } else {
          return null
        }
      }}
    />
  )
}

export const GeneSearchResults = withSystemContext(GeneSearchResultsComponent)
