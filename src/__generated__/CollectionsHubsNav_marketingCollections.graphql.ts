/**
 * @generated SignedSource<<fb47cf05bf09066df6d7f0e8c5c3f55b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNav_marketingCollections$data = ReadonlyArray<{
  readonly slug: string;
  readonly thumbnail: string | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "CollectionsHubsNav_marketingCollections";
}>;
export type CollectionsHubsNav_marketingCollections$key = ReadonlyArray<{
  readonly " $data"?: CollectionsHubsNav_marketingCollections$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsNav_marketingCollections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubsNav_marketingCollections",
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

(node as any).hash = "8185f2013a226a3705b5221e4d675b5a";

export default node;
