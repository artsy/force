/**
 * @generated SignedSource<<71e4e43c868239a3ce483237f585944a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectionsHubsHomepageNav_marketingHubCollections$data = ReadonlyArray<{
  readonly slug: string;
  readonly title: string;
  readonly thumbnail: string | null;
  readonly " $fragmentType": "CollectionsHubsHomepageNav_marketingHubCollections";
}>;
export type CollectionsHubsHomepageNav_marketingHubCollections$key = ReadonlyArray<{
  readonly " $data"?: CollectionsHubsHomepageNav_marketingHubCollections$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsHubsHomepageNav_marketingHubCollections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CollectionsHubsHomepageNav_marketingHubCollections",
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

(node as any).hash = "34bd7792d5ea1762efa545928881b4b5";

export default node;
