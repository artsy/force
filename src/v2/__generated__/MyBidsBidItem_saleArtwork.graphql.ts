/**
 * @generated SignedSource<<c4f8330d2d64b0df95220c5bc0e3e5d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyBidsBidItem_saleArtwork$data = {
  readonly artwork: {
    readonly artistNames: string | null;
    readonly image: {
      readonly resized: {
        readonly src: string;
        readonly srcSet: string;
      } | null;
    } | null;
  } | null;
  readonly estimate: string | null;
  readonly currentBid: {
    readonly display: string | null;
  } | null;
  readonly internalID: string;
  readonly isHighestBidder: boolean | null;
  readonly isWatching: boolean | null;
  readonly lotState: {
    readonly bidCount: number | null;
    readonly sellingPrice: {
      readonly display: string | null;
    } | null;
  } | null;
  readonly lotLabel: string | null;
  readonly slug: string;
  readonly " $fragmentType": "MyBidsBidItem_saleArtwork";
};
export type MyBidsBidItem_saleArtwork$key = {
  readonly " $data"?: MyBidsBidItem_saleArtwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyBidsBidItem_saleArtwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyBidsBidItem_saleArtwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Artwork",
      "kind": "LinkedField",
      "name": "artwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artistNames",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 55
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 55
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "src",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(height:55,width:55)"
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
      "name": "estimate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkCurrentBid",
      "kind": "LinkedField",
      "name": "currentBid",
      "plural": false,
      "selections": (v0/*: any*/),
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
      "name": "isHighestBidder",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isWatching",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CausalityLotState",
      "kind": "LinkedField",
      "name": "lotState",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bidCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "sellingPrice",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "SaleArtwork",
  "abstractKey": null
};
})();

(node as any).hash = "96aa172209d13cf0db980cf0357f473b";

export default node;
