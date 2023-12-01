/**
 * @generated SignedSource<<13a9c21a90b44281d74e4dcca28f09f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarBidAction_artwork$data = {
  readonly internalID: string;
  readonly myLotStanding: ReadonlyArray<{
    readonly most_recent_bid: {
      readonly max_bid: {
        readonly cents: number | null | undefined;
      } | null | undefined;
    } | null | undefined;
  }> | null | undefined;
  readonly sale: {
    readonly is_closed: boolean | null | undefined;
    readonly is_live_open: boolean | null | undefined;
    readonly is_open: boolean | null | undefined;
    readonly is_preview: boolean | null | undefined;
    readonly is_registration_closed: boolean | null | undefined;
    readonly registrationStatus: {
      readonly qualified_for_bidding: boolean | null | undefined;
    } | null | undefined;
    readonly requireIdentityVerification: boolean | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly sale_artwork: {
    readonly endedAt: string | null | undefined;
    readonly increments: ReadonlyArray<{
      readonly cents: number | null | undefined;
      readonly display: string | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtworkSidebarBidAction_artwork";
};
export type ArtworkSidebarBidAction_artwork$key = {
  readonly " $data"?: ArtworkSidebarBidAction_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkSidebarBidAction_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarBidAction_artwork",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        }
      ],
      "concreteType": "LotStanding",
      "kind": "LinkedField",
      "name": "myLotStanding",
      "plural": true,
      "selections": [
        {
          "alias": "most_recent_bid",
          "args": null,
          "concreteType": "BidderPosition",
          "kind": "LinkedField",
          "name": "mostRecentBid",
          "plural": false,
          "selections": [
            {
              "alias": "max_bid",
              "args": null,
              "concreteType": "BidderPositionMaxBid",
              "kind": "LinkedField",
              "name": "maxBid",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "myLotStanding(live:true)"
    },
    (v1/*: any*/),
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
          "name": "registrationStatus",
          "plural": false,
          "selections": [
            {
              "alias": "qualified_for_bidding",
              "args": null,
              "kind": "ScalarField",
              "name": "qualifiedForBidding",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": "is_preview",
          "args": null,
          "kind": "ScalarField",
          "name": "isPreview",
          "storageKey": null
        },
        {
          "alias": "is_open",
          "args": null,
          "kind": "ScalarField",
          "name": "isOpen",
          "storageKey": null
        },
        {
          "alias": "is_live_open",
          "args": null,
          "kind": "ScalarField",
          "name": "isLiveOpen",
          "storageKey": null
        },
        {
          "alias": "is_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        },
        {
          "alias": "is_registration_closed",
          "args": null,
          "kind": "ScalarField",
          "name": "isRegistrationClosed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "requireIdentityVerification",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "sale_artwork",
      "args": null,
      "concreteType": "SaleArtwork",
      "kind": "LinkedField",
      "name": "saleArtwork",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BidIncrementsFormatted",
          "kind": "LinkedField",
          "name": "increments",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "display",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endedAt",
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

(node as any).hash = "ef98ba696c44f0d74e28be6047ea4ce3";

export default node;
