/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Collections_marketingCategories = ReadonlyArray<{
    readonly name: string;
    readonly collections: ReadonlyArray<{
        readonly slug: string;
        readonly headerImage: string | null;
        readonly title: string;
    }>;
    readonly " $refType": "Collections_marketingCategories";
}>;
export type Collections_marketingCategories$data = Collections_marketingCategories;
export type Collections_marketingCategories$key = ReadonlyArray<{
    readonly " $data"?: Collections_marketingCategories$data;
    readonly " $fragmentRefs": FragmentRefs<"Collections_marketingCategories">;
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
      "alias": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "kind": "LinkedField",
      "name": "collections",
      "plural": true,
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
          "name": "headerImage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MarketingCollectionCategory"
};
(node as any).hash = '76554c57a5339cf4a60df12cdee4be57';
export default node;
