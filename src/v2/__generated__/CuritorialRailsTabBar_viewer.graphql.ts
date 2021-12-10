/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CuritorialRailsTabBar_viewer = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"MyBids_me">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"WorksByArtistsYouFollowRail_viewer" | "TrendingLotsRail_viewer" | "StandoutLotsRail_viewer">;
    readonly " $refType": "CuritorialRailsTabBar_viewer";
};
export type CuritorialRailsTabBar_viewer$data = CuritorialRailsTabBar_viewer;
export type CuritorialRailsTabBar_viewer$key = {
    readonly " $data"?: CuritorialRailsTabBar_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"CuritorialRailsTabBar_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CuritorialRailsTabBar_viewer",
  "selections": [
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
(node as any).hash = 'bdcf372f9a7ca985850f09d7e3cf6068';
export default node;
