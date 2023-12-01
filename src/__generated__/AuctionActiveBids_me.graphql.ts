/**
 * @generated SignedSource<<b15ffec7613784972fd601aff573d2aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionActiveBids_me$data = {
  readonly internalID: string;
  readonly lotStandings: ReadonlyArray<{
    readonly isHighestBidder: boolean | null | undefined;
    readonly saleArtwork: {
      readonly counts: {
        readonly bidderPositions: any | null | undefined;
      } | null | undefined;
      readonly currentBid: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly endedAt: string | null | undefined;
      readonly highestBid: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly lotLabel: string | null | undefined;
      readonly reserveStatus: string | null | undefined;
      readonly sale: {
        readonly endAt: string | null | undefined;
        readonly isClosed: boolean | null | undefined;
        readonly isLiveOpen: boolean | null | undefined;
        readonly liveStartAt: string | null | undefined;
        readonly slug: string;
      } | null | undefined;
      readonly saleID: string | null | undefined;
      readonly slug: string;
      readonly " $fragmentSpreads": FragmentRefs<"AuctionLotInfo_saleArtwork">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "AuctionActiveBids_me";
};
export type AuctionActiveBids_me$key = {
  readonly " $data"?: AuctionActiveBids_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionActiveBids_me">;
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
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionActiveBids_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "saleID",
          "variableName": "saleID"
        }
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "lotStandings",
      "plural": true,
      "selections": [
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
          "concreteType": "SaleArtwork",
          "kind": "LinkedField",
          "name": "saleArtwork",
          "plural": false,
          "selections": [
            {
              "args": [
                {
                  "kind": "Literal",
                  "name": "imageHeight",
                  "value": 100
                },
                {
                  "kind": "Literal",
                  "name": "imageWidth",
                  "value": 100
                }
              ],
              "kind": "FragmentSpread",
              "name": "AuctionLotInfo_saleArtwork"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtworkCounts",
              "kind": "LinkedField",
              "name": "counts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "bidderPositions",
                  "storageKey": null
                }
              ],
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
            (v1/*: any*/),
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
              "name": "reserveStatus",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "saleID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtworkHighestBid",
              "kind": "LinkedField",
              "name": "highestBid",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endedAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Sale",
              "kind": "LinkedField",
              "name": "sale",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "liveStartAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isLiveOpen",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isClosed",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
})();

(node as any).hash = "22040b50814763b99b53e2e61d7b1a41";

export default node;
