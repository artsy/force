/**
 * @generated SignedSource<<5c3831504ef14a26cd19ca766eb93f6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Collect_marketingCollections$data = ReadonlyArray<{
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_marketingCollections">;
  readonly " $fragmentType": "Collect_marketingCollections";
}>;
export type Collect_marketingCollections$key = ReadonlyArray<{
  readonly " $data"?: Collect_marketingCollections$data;
  readonly " $fragmentSpreads": FragmentRefs<"Collect_marketingCollections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Collect_marketingCollections",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionsHubsNav_marketingCollections"
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "1c038f9b6222b1a517dc8fcb0b1181e4";

export default node;
