/**
 * @generated SignedSource<<308b9af8f760d32297b66c9e79182bbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CuritorialRailsTabBar_viewer$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"MyBids_me">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"WorksByArtistsYouFollowRail_viewer" | "TrendingLotsRail_viewer" | "StandoutLotsRail_viewer">;
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

(node as any).hash = "bdcf372f9a7ca985850f09d7e3cf6068";

export default node;
