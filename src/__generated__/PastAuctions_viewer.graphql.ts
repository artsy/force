/**
 * @generated SignedSource<<d916563d68c6603cd104c97051389209>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PastAuctions_viewer$data = {
  readonly salesConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly endAt: string | null | undefined
                        readonly href: string | null | undefined
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
  readonly " $fragmentType": "PastAuctions_viewer"
}
export type PastAuctions_viewer$key = {
  readonly " $data"?: PastAuctions_viewer$data
  readonly " $fragmentSpreads": FragmentRefs<"PastAuctions_viewer">
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
  name: "PastAuctions_viewer",
  selections: [
    {
      alias: "salesConnection",
      args: [
        {
          kind: "Literal",
          name: "auctionState",
          value: "CLOSED",
        },
        {
          kind: "Literal",
          name: "live",
          value: false,
        },
        {
          kind: "Literal",
          name: "sort",
          value: "TIMELY_AT_NAME_DESC",
        },
      ],
      concreteType: "SaleConnection",
      kind: "LinkedField",
      name: "__PastAuctions_salesConnection_connection",
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
                  name: "endAt",
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
        '__PastAuctions_salesConnection_connection(auctionState:"CLOSED",live:false,sort:"TIMELY_AT_NAME_DESC")',
    },
  ],
  type: "Viewer",
  abstractKey: null,
}
;(node as any).hash = "a05f47a95f14d47d9ece04cff159b77f"

export default node
