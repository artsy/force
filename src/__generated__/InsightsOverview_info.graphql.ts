/**
 * @generated SignedSource<<27f337593e8a95145cb59b1e2ea4fd40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsOverview_info$data = {
  readonly artistsCount: number;
  readonly artworksCount: number;
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
