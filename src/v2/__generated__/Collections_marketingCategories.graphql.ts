/**
 * @generated SignedSource<<4c1995e9e12c4ec469578723ecada7cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Collections_marketingCategories$data = ReadonlyArray<{
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"CollectionsCategory_category">;
  readonly " $fragmentType": "Collections_marketingCategories";
}>;
export type Collections_marketingCategories$key = ReadonlyArray<{
  readonly " $data"?: Collections_marketingCategories$data;
  readonly " $fragmentSpreads": FragmentRefs<"Collections_marketingCategories">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "Collections_marketingCategories",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionsCategory_category"
    }
  ],
  "type": "MarketingCollectionCategory",
  "abstractKey": null
};

(node as any).hash = "d84d53bcdc86de6624b328eb3553b487";

export default node;
