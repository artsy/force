/**
 * @generated SignedSource<<4da7df016211ac7894029242b768a922>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionBidRoute_artwork$data = {
  readonly internalID: string;
  readonly saleArtwork: {
    readonly increments: ReadonlyArray<{
      readonly cents: number | null | undefined;
      readonly display: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly minimumNextBid: {
      readonly cents: number | null | undefined;
    } | null | undefined;
    readonly sale: {
      readonly bidder: {
        readonly id: string;
      } | null | undefined;
      readonly internalID: string;
      readonly registrationStatus: {
        readonly qualifiedForBidding: boolean | null | undefined;
      } | null | undefined;
      readonly slug: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"AuctionLotInfo_saleArtwork">;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarAuctionTimer_artwork">;
  readonly " $fragmentType": "AuctionBidRoute_artwork";
};
export type AuctionBidRoute_artwork$key = {
  readonly " $data"?: AuctionBidRoute_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionBidRoute_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionBidRoute_artwork",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSidebarAuctionTimer_artwork"
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
              "value": 150
            },
            {
              "kind": "Literal",
              "name": "imageWidth",
              "value": 150
            }
          ],
          "kind": "FragmentSpread",
          "name": "AuctionLotInfo_saleArtwork"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleArtworkMinimumNextBid",
          "kind": "LinkedField",
          "name": "minimumNextBid",
          "plural": false,
          "selections": [
            (v2/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "useMyMaxBid",
              "value": true
            }
          ],
          "concreteType": "BidIncrementsFormatted",
          "kind": "LinkedField",
          "name": "increments",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "display",
              "storageKey": null
            }
          ],
          "storageKey": "increments(useMyMaxBid:true)"
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
              "concreteType": "Bidder",
              "kind": "LinkedField",
              "name": "bidder",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Bidder",
              "kind": "LinkedField",
              "name": "registrationStatus",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "qualifiedForBidding",
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
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "9cd2d727e0d0c0dbb8242519d05ac7cd";

export default node;
