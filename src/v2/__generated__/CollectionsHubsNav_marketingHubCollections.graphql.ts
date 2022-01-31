/**
 * @generated SignedSource<<d02dbe1d622ebb81b67a5a8f9a626133>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNav_marketingHubCollections$data = ReadonlyArray<{
  readonly slug: string;
  readonly title: string;
  readonly thumbnail: string | null;
  readonly " $fragmentType": "CollectionsHubsNav_marketingHubCollections";
}>;
export type CollectionsHubsNav_marketingHubCollections$key = ReadonlyArray<{
  readonly " $data"?: CollectionsHubsNav_marketingHubCollections$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_marketingHubCollections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubsNav_marketingHubCollections",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "thumbnail",
      "storageKey": null
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "786fb4ee21714400af909abef5fda8ea";

export default node;
