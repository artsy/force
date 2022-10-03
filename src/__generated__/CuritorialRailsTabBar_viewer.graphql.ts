/**
 * @generated SignedSource<<8c56eabf4227d756199f6fcb92a11fac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CuritorialRailsTabBar_viewer$data = {
  readonly followedArtistsInAuction: {
    readonly counts: {
      readonly total: any | null;
    } | null;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"MyBids_me">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StandoutLotsRail_viewer" | "TrendingLotsRail_viewer" | "WorksByArtistsYouFollowRail_viewer">;
  readonly " $fragmentType": "CuritorialRailsTabBar_viewer";
};
export type CuritorialRailsTabBar_viewer$key = {
  readonly " $data"?: CuritorialRailsTabBar_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"CuritorialRailsTabBar_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CuritorialRailsTabBar_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorksByArtistsYouFollowRail_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TrendingLotsRail_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StandoutLotsRail_viewer"
    },
    {
      "alias": "followedArtistsInAuction",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "includeArtworksByFollowedArtists",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "isAuction",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "liveSale",
          "value": true
        }
      ],
      "concreteType": "SaleArtworksConnection",
      "kind": "LinkedField",
      "name": "saleArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterSaleArtworksCounts",
          "kind": "LinkedField",
          "name": "counts",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "total",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "saleArtworksConnection(first:1,includeArtworksByFollowedArtists:true,isAuction:true,liveSale:true)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Me",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyBids_me"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "dec059894c8e871c01abce1b469a5827";

export default node;
