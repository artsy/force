/**
 * @generated SignedSource<<29a366669cdb71e59492d817fe53dc8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionCurrentAuctionsRail_viewer$data = {
  readonly salesConnection:
    | {
        readonly edges:
          | ReadonlyArray<
              | {
                  readonly node:
                    | {
                        readonly " $fragmentSpreads": FragmentRefs<"CellSale_sale">
                      }
                    | null
                    | undefined
                }
              | null
              | undefined
            >
          | null
          | undefined
      }
    | null
    | undefined
  readonly " $fragmentType": "AuctionCurrentAuctionsRail_viewer"
}
export type AuctionCurrentAuctionsRail_viewer$key = {
  readonly " $data"?: AuctionCurrentAuctionsRail_viewer$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionCurrentAuctionsRail_viewer">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "AuctionCurrentAuctionsRail_viewer",
  selections: [
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "first",
          value: 30,
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
      name: "salesConnection",
      plural: false,
      selections: [
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
                  args: null,
                  kind: "FragmentSpread",
                  name: "CellSale_sale",
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey:
        'salesConnection(first:30,live:true,published:true,sort:"LICENSED_TIMELY_AT_NAME_DESC")',
    },
  ],
  type: "Viewer",
  abstractKey: null,
}

;(node as any).hash = "f22358b0a4ca4f0f87dcd74c7f6fedf6"

export default node
