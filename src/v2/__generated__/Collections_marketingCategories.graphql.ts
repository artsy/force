/* tslint:disable */

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
  "kind": "Fragment",
  "name": "Collections_marketingCategories",
  "type": "MarketingCollectionCategory",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "collections",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollection",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "headerImage",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "title",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '76554c57a5339cf4a60df12cdee4be57';
export default node;
