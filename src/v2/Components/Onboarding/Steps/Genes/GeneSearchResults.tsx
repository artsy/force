import { GeneSearchResults_viewer } from "v2/__generated__/GeneSearchResults_viewer.graphql"
import {
  GeneSearchResultsFollowGeneMutation,
  GeneSearchResultsFollowGeneMutationResponse,
} from "v2/__generated__/GeneSearchResultsFollowGeneMutation.graphql"
import { GeneSearchResultsQuery } from "v2/__generated__/GeneSearchResultsQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { garamond } from "v2/Assets/Fonts"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import track, { TrackingProp } from "react-tracking"
import { RecordSourceSelectorProxy } from "relay-runtime"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

type Gene = GeneSearchResults_viewer["match_gene"]["edges"][number]["node"]

interface ContainerProps extends FollowProps {
  term: string
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  tracking?: TrackingProp
  relay?: RelayProp
  viewer: GeneSearchResults_viewer
}

const NoResultsContainer = styled.div`
  ${garamond("s17")};
  text-align: center;
  font-style: italic;
  border-bottom: none;
  font-weight: lighter;
`

@track({}, { dispatch: data => Events.postEvent(data) })
class GeneSearchResultsContent extends React.Component<Props, null> {
  private excludedGeneIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      this.props.viewer.match_gene.edges.map(({ node }) => node.internalID)
    )
  }

  onGeneFollowed(
    gene: Gene,
    store: RecordSourceSelectorProxy,
    data: GeneSearchResultsFollowGeneMutationResponse
  ): void {
    const suggestedGene = store.get(
      data.followGene.gene.similar.edges[0].node.id
    )
    this.excludedGeneIds.add(suggestedGene.getValue("internalID") as string)

    const suggestedGenesRootField = store.get("client:root:viewer")
    const suggestedGenes = suggestedGenesRootField.getLinkedRecords(
      "match_gene",
      { term: this.props.term }
    )
    const updatedSuggestedGenes = suggestedGenes.map(geneItem =>
      geneItem.getValue("id") === gene.id ? suggestedGene : geneItem
    )

    suggestedGenesRootField.setLinkedRecords(
      updatedSuggestedGenes,
      "match_gene",
      { term: this.props.term }
    )

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Gene",
      entity_id: gene.internalID,
      entity_slug: gene.slug,
      context_module: "onboarding search",
    })
  }

  followedGene(gene: Gene) {
    this.excludedGeneIds.add(gene.internalID)

    commitMutation<GeneSearchResultsFollowGeneMutation>(
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
          },
          excludedGeneIds: Array.from(this.excludedGeneIds),
        },
        updater: (store, data) => this.onGeneFollowed(gene, store, data),
      }
    )
  }

  render() {
    const items = this.props.viewer.match_gene.edges.map(
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
                onClick={() => this.followedGene(item)}
              />
            </ReplaceTransition>
          </LinkContainer>
        )
      }
    )

    if (items.length < 1) {
      return <NoResultsContainer>No Results Found</NoResultsContainer>
    }

    return <div>{items}</div>
  }
}

const GeneSearchResultsContentContainer = createFragmentContainer(
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
> = ({ term, relayEnvironment, updateFollowCount }) => {
  return (
    <QueryRenderer<GeneSearchResultsQuery>
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
              viewer={props.viewer}
              term={term}
              updateFollowCount={updateFollowCount}
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
