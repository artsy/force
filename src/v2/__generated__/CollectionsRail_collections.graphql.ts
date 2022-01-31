/**
 * @generated SignedSource<<ee34f6d3324fcd05bc6f47bbaed3c33f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsRail_collections$data = ReadonlyArray<{
  readonly " $fragmentSpreads": FragmentRefs<"CollectionEntity_collection">;
  readonly " $fragmentType": "CollectionsRail_collections";
}>;
export type CollectionsRail_collections$key = ReadonlyArray<{
  readonly " $data"?: CollectionsRail_collections$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsRail_collections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsRail_collections",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionEntity_collection"
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "35961dd8c6f3b9ed5fff404b9a586026";

export default node;
