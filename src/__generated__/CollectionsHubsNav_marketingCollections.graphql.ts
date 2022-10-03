/**
 * @generated SignedSource<<4284fc1010a2444c678c3af6c98552cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsNav_marketingCollections$data = ReadonlyArray<{
  readonly slug: string;
  readonly title: string;
  readonly thumbnail: string | null;
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
