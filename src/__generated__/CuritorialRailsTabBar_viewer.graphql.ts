/**
 * @generated SignedSource<<39c73ad3ae19d2e84b3efa6064425553>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CuritorialRailsTabBar_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StandoutLotsRail_viewer" | "TrendingLotsRail_viewer">;
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

(node as any).hash = "2f39ad7859740cdc958625503b9c6870";

export default node;
