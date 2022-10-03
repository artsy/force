/**
 * @generated SignedSource<<1e4e59fa178bd980d7ee97c5c3d3ba39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CuritorialRailsTabBar_viewer">;
  readonly " $fragmentType": "AuctionsApp_viewer";
};
export type AuctionsApp_viewer$key = {
  readonly " $data"?: AuctionsApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionsApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionsApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CuritorialRailsTabBar_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "a21e446dcd4d92f163c3a4cc47bb561a";

export default node;
