/**
 * @generated SignedSource<<2ebb3ca817be6f6bafcd607344b3c2ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionResultImage_auctionResult$data = {
  readonly images:
    | {
        readonly larger:
          | {
              readonly resized:
                | {
                    readonly height: number | null | undefined
                    readonly src: string
                    readonly srcSet: string
                    readonly width: number | null | undefined
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
  readonly title: string | null | undefined
  readonly " $fragmentType": "AuctionResultImage_auctionResult"
}
export type AuctionResultImage_auctionResult$key = {
  readonly " $data"?: AuctionResultImage_auctionResult$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultImage_auctionResult">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "AuctionResultImage_auctionResult",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "title",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "AuctionLotImages",
      kind: "LinkedField",
      name: "images",
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "Image",
          kind: "LinkedField",
          name: "larger",
          plural: false,
          selections: [
            {
              alias: null,
              args: [
                {
                  kind: "Literal",
                  name: "height",
                  value: 400,
                },
                {
                  kind: "Literal",
                  name: "version",
                  value: "larger",
                },
                {
                  kind: "Literal",
                  name: "width",
                  value: 400,
                },
              ],
              concreteType: "ResizedImageUrl",
              kind: "LinkedField",
              name: "resized",
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "src",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "srcSet",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "height",
                  storageKey: null,
                },
                {
                  alias: null,
                  args: null,
                  kind: "ScalarField",
                  name: "width",
                  storageKey: null,
                },
              ],
              storageKey: 'resized(height:400,version:"larger",width:400)',
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "AuctionResult",
  abstractKey: null,
}

;(node as any).hash = "ef48be4be856e2a9fa5cda958b240d17"

export default node
