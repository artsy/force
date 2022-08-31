/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CuritorialRailsTabBar_viewer = {
    readonly followedArtistsInAuction: {
        readonly counts: {
            readonly total: number | null;
        } | null;
    } | null;
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"WorksByArtistsYouFollowRail_viewer" | "TrendingLotsRail_viewer" | "StandoutLotsRail_viewer">;
    readonly " $refType": "CuritorialRailsTabBar_viewer";
};
export type CuritorialRailsTabBar_viewer$data = CuritorialRailsTabBar_viewer;
export type CuritorialRailsTabBar_viewer$key = {
    readonly " $data"?: CuritorialRailsTabBar_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CuritorialRailsTabBar_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CuritorialRailsTabBar_viewer",
  "selections": [
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
    },
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
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'dec059894c8e871c01abce1b469a5827';
export default node;
