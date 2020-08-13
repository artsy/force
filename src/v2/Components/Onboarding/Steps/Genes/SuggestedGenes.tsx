import { SuggestedGenes_suggested_genes } from "v2/__generated__/SuggestedGenes_suggested_genes.graphql"
import {
  SuggestedGenesFollowGeneMutation,
  SuggestedGenesFollowGeneMutationResponse,
} from "v2/__generated__/SuggestedGenesFollowGeneMutation.graphql"
import { SuggestedGenesQuery } from "v2/__generated__/SuggestedGenesQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import track, { TrackingProp } from "react-tracking"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { get } from "v2/Utils/get"
import Events from "../../../../Utils/Events"
import ReplaceTransition from "../../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../../ItemLink"
import { FollowProps } from "../../Types"

type Gene = SuggestedGenes_suggested_genes[0]

interface Props extends React.HTMLProps<HTMLAnchorElement>, FollowProps {
  relay?: RelayProp
  suggested_genes: SuggestedGenes_suggested_genes
  tracking?: TrackingProp
}

@track({}, { dispatch: data => Events.postEvent(data) })
class SuggestedGenesContent extends React.Component<Props> {
  private excludedGeneIds: Set<string>
  followCount: number = 0

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      this.props.suggested_genes.map(item => item.internalID)
    )
  }

  onGeneFollowed(
    gene: Gene,
    store: RecordSourceSelectorProxy,
    data: SuggestedGenesFollowGeneMutationResponse
  ): void {
    const suggestedGene = store.get(
      data.followGene.gene.similar.edges[0].node.id
    )
    this.excludedGeneIds.add(suggestedGene.getValue("internalID") as string)

    const suggestedGenesRootField = store.get("client:root")
    const suggestedGenes = suggestedGenesRootField.getLinkedRecords(
      "suggested_genes"
    )
    const updatedSuggestedGenes = suggestedGenes.map(geneItem =>
      geneItem.getValue("id") === gene.id ? suggestedGene : geneItem
    )

    suggestedGenesRootField.setLinkedRecords(
      updatedSuggestedGenes,
      "suggested_genes"
    )

    this.followCount += 1

    this.props.updateFollowCount(this.followCount)

    this.props.tracking.trackEvent({
      action: "Followed Gene",
      entity_id: gene.internalID,
      entity_slug: gene.slug,
      context_module: "onboarding recommended",
    })
  }

  followedGene(gene: Gene) {
    this.excludedGeneIds.add(gene.internalID)

    commitMutation<SuggestedGenesFollowGeneMutation>(
      this.props.relay.environment,
      {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation SuggestedGenesFollowGeneMutation(
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
    const items = this.props.suggested_genes.map((item, index) => {
      const imageUrl = get(item, i => i.image.cropped.url)
      return (
        <LinkContainer key={`suggested-genes-${index}`}>
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
    })

    return <div>{items}</div>
  }
}

const SuggestedGenesContainer = createFragmentContainer(SuggestedGenesContent, {
  suggested_genes: graphql`
    fragment SuggestedGenes_suggested_genes on Gene @relay(plural: true) {
      id
      slug
      internalID
      name
      image {
        cropped(width: 100, height: 100) {
          url
        }
      }
    }
  `,
})

const SuggestedGenesComponent: React.SFC<SystemContextProps & FollowProps> = ({
  relayEnvironment,
  updateFollowCount,
}) => {
  return (
    <QueryRenderer<SuggestedGenesQuery>
      environment={relayEnvironment}
      query={graphql`
        query SuggestedGenesQuery {
          highlights {
            suggested_genes: broadCollectingGenes {
              ...SuggestedGenes_suggested_genes
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (props) {
          return (
            <SuggestedGenesContainer
              suggested_genes={props.highlights.suggested_genes}
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

export const SuggestedGenes = withSystemContext(SuggestedGenesComponent)
