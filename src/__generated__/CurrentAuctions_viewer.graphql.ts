/**
 * @generated SignedSource<<e06694292eaa7d7758eb3780e8464fcb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CurrentAuctions_viewer$data = {
  readonly salesConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly href: string | null | undefined
                        readonly isLiveOpen: boolean | null | undefined
                        readonly liveStartAt: string | null | undefined
                        readonly name: string | null | undefined
                        readonly slug: string
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
        readonly totalCount: number | null | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "CurrentAuctions_viewer"
}
export type CurrentAuctions_viewer$key = {
  readonly " $data"?: CurrentAuctions_viewer$data
  readonly " $fragmentSpreads": FragmentRefs<"CurrentAuctions_viewer">
}

const node: ReaderFragment = {
  argumentDefinitions: [
    {
      defaultValue: null,
      kind: "LocalArgument",
      name: "after",
    },
    {
      defaultValue: 10,
      kind: "LocalArgument",
      name: "first",
    },
  ],
  kind: "Fragment",
  metadata: {
    connection: [
      {
        count: "first",
        cursor: "after",
        direction: "forward",
        path: ["salesConnection"],
      },
    ],
  },
  name: "CurrentAuctions_viewer",
  selections: [
    {
      alias: "salesConnection",
      args: [
        {
          kind: "Literal",
          name: "auctionState",
          value: "OPEN",
        },
        {
          kind: "Literal",
          name: "live",
          value: true,
        },
        {
          kind: "Literal",
          name: "published",
          value: true,
        },
        {
          kind: "Literal",
          name: "sort",
          value: "LICENSED_TIMELY_AT_NAME_DESC",
        },
      ],
      concreteType: "SaleConnection",
      kind: "LinkedField",
      name: "__CurrentAuctions_salesConnection_connection",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "totalCount",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: "SaleEdge",
          kind: "LinkedField",
          name: "edges",
          plural: true,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: "Sale",
              kind: "LinkedField",
              name: "node",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "slug",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "name",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "href",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "liveStartAt",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "isLiveOpen",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "__typename",
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "cursor",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: "PageInfo",
          kind: "LinkedField",
          name: "pageInfo",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "endCursor",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "hasNextPage",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey:
        '__CurrentAuctions_salesConnection_connection(auctionState:"OPEN",live:true,published:true,sort:"LICENSED_TIMELY_AT_NAME_DESC")',
    },
  ],
  type: "Viewer",
  abstractKey: null,
}
;(node as any).hash = "38c994c7874307977baafd577ec5cb05"

export default node
