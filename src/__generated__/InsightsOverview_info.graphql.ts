/**
 * @generated SignedSource<<c35cff711d26c88a69c03ba05cdf7fc5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsOverview_info$data = {
  readonly artworksCount: number;
  readonly artistsCount: number;
  readonly " $fragmentType": "InsightsOverview_info";
};
export type InsightsOverview_info$key = {
  readonly " $data"?: InsightsOverview_info$data;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsOverview_info">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InsightsOverview_info",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworksCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistsCount",
      "storageKey": null
    }
  ],
  "type": "MyCollectionInfo",
  "abstractKey": null
};

(node as any).hash = "31731a4df77fe241d978cc8a19580e07";

export default node;
