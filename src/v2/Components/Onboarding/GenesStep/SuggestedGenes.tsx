import { SuggestedGenes_suggested_genes$data } from "v2/__generated__/SuggestedGenes_suggested_genes.graphql"
import {
  SuggestedGenesFollowGeneMutation,
  SuggestedGenesFollowGeneMutation$data,
  // SuggestedGenesFollowGeneMutation$data,
} from "v2/__generated__/SuggestedGenesFollowGeneMutation.graphql"
import { SuggestedGenesQuery } from "v2/__generated__/SuggestedGenesQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import * as React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { get } from "v2/Utils/get"
import ReplaceTransition from "../../Animation/ReplaceTransition"
import ItemLink, { LinkContainer } from "../ItemLink"

type Gene = SuggestedGenes_suggested_genes$data[0]

interface ContainerProps {
  onGeneFollow
}

interface Props extends React.HTMLProps<HTMLAnchorElement>, ContainerProps {
  relay?: RelayProp
  suggested_genes: SuggestedGenes_suggested_genes$data
}

class SuggestedGenesContent extends React.Component<Props> {
  private excludedGeneIds: Set<string>

  constructor(props: Props, context: any) {
    super(props, context)
    this.excludedGeneIds = new Set(
      this.props.suggested_genes.map(item => item.internalID)
    )
  }

  onGeneFollowed(
    gene: Gene,
    store: RecordSourceSelectorProxy,
    data: SuggestedGenesFollowGeneMutation$data,
    follow: boolean
  ): void {
    this.props.onGeneFollow(follow, gene)

    const suggestedGene = store.get(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      data.followGene.gene.similar.edges[0].node.id
    )
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    this.excludedGeneIds.add(suggestedGene.getValue("internalID") as string)

    const suggestedGenesRootField = store.get("client:root")
    const suggestedGenes =
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      suggestedGenesRootField.getLinkedRecords("suggested_genes") || []
    const updatedSuggestedGenes = suggestedGenes.map(geneItem =>
      geneItem.getValue("id") === gene.id ? suggestedGene : geneItem
    )

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    suggestedGenesRootField.setLinkedRecords(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      updatedSuggestedGenes,
      "suggested_genes"
    )
  }

  followedGene(gene: Gene, follow: boolean) {
    this.excludedGeneIds.add(gene.internalID)

    commitMutation<SuggestedGenesFollowGeneMutation>(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
    const items = this.props.suggested_genes.map((item, index) => {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              name={item.name}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              image_url={imageUrl}
              onFollow={selected => this.followedGene(item, selected)}
            />
          </ReplaceTransition>
        </LinkContainer>
      )
    })

    return <div>{items}</div>
  }
}

export const SuggestedGenesContainer = createFragmentContainer(
  SuggestedGenesContent,
  {
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
  }
)

const SuggestedGenesComponent: React.SFC<
  ContainerProps & SystemContextProps
> = ({ onGeneFollow, relayEnvironment }) => {
  return (
    <SystemQueryRenderer<SuggestedGenesQuery>
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
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              onGeneFollow={onGeneFollow}
              // @ts-ignore // FIXME: The types in this file are pretty far gone
              suggested_genes={props.highlights?.suggested_genes!}
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
