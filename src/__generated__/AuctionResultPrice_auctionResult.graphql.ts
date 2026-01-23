/**
 * @generated SignedSource<<a1ce7dad6b89a7203714071e659c99a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResultPrice_auctionResult$data = {
  readonly boughtIn: boolean | null | undefined;
  readonly currency: string | null | undefined;
  readonly estimate: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly images: {
    readonly larger: {
      readonly aspectRatio: number;
      readonly blurhash: string | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly isUpcoming: boolean | null | undefined;
  readonly performance: {
    readonly mid: string | null | undefined;
  } | null | undefined;
  readonly priceRealized: {
    readonly display: string | null | undefined;
    readonly displayUSD: string | null | undefined;
  } | null | undefined;
  readonly saleDate: string | null | undefined;
  readonly " $fragmentType": "AuctionResultPrice_auctionResult";
};
export type AuctionResultPrice_auctionResult$key = {
  readonly " $data"?: AuctionResultPrice_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultPrice_auctionResult">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResultPrice_auctionResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "boughtIn",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isUpcoming",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotImages",
      "kind": "LinkedField",
      "name": "images",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "larger",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "main"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"main\")"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "blurhash",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotPerformance",
      "kind": "LinkedField",
      "name": "performance",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mid",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotEstimate",
      "kind": "LinkedField",
      "name": "estimate",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionResultPriceRealized",
      "kind": "LinkedField",
      "name": "priceRealized",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayUSD",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};
})();

(node as any).hash = "c0155dec6dbf76351d5b5e98f0f9c6a6";

export default node;
