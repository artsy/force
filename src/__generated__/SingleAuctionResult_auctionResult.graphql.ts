/**
 * @generated SignedSource<<f9f7e11f8b0fb8b6d36a3fd81edd445c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SingleAuctionResult_auctionResult$data = {
  readonly artistID: string;
  readonly boughtIn: boolean | null;
  readonly categoryText: string | null;
  readonly currency: string | null;
  readonly dateText: string | null;
  readonly dimensionText: string | null;
  readonly dimensions: {
    readonly height: number | null;
    readonly width: number | null;
  } | null;
  readonly estimate: {
    readonly display: string | null;
    readonly high: number | null;
    readonly low: number | null;
  } | null;
  readonly id: string;
  readonly images: {
    readonly thumbnail: {
      readonly aspectRatio: number;
      readonly height: number | null;
      readonly url: string | null;
      readonly width: number | null;
    } | null;
  } | null;
  readonly internalID: string;
  readonly location: string | null;
  readonly mediumText: string | null;
  readonly organization: string | null;
  readonly performance: {
    readonly mid: string | null;
  } | null;
  readonly priceRealized: {
    readonly cents: number | null;
    readonly centsUSD: number | null;
    readonly display: string | null;
    readonly displayUSD: string | null;
  } | null;
  readonly saleDate: string | null;
  readonly saleTitle: string | null;
  readonly title: string | null;
  readonly " $fragmentType": "SingleAuctionResult_auctionResult";
};
export type SingleAuctionResult_auctionResult$key = {
  readonly " $data"?: SingleAuctionResult_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"SingleAuctionResult_auctionResult">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v2 = {
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
  "name": "SingleAuctionResult_auctionResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistID",
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
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "categoryText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotDimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dimensionText",
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
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "high",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "low",
          "storageKey": null
        }
      ],
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
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "square140"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"square140\")"
            },
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "aspectRatio",
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
      "kind": "ScalarField",
      "name": "location",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mediumText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "organization",
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
      "concreteType": "AuctionResultPriceRealized",
      "kind": "LinkedField",
      "name": "priceRealized",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cents",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "centsUSD",
          "storageKey": null
        },
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayUSD",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "name": "saleTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};
})();

(node as any).hash = "3d44e88f3aa1c3693fe2cb7b700e4004";

export default node;
