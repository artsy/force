/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Header_collection = {
    readonly category: string;
    readonly credit: string | null;
    readonly description: string | null;
    readonly featuredArtistExclusionIds: ReadonlyArray<string> | null;
    readonly headerImage: string | null;
    readonly id: string;
    readonly query: {
        readonly artistIDs: ReadonlyArray<string> | null;
    };
    readonly slug: string;
    readonly title: string;
    readonly " $refType": "Header_collection";
};
export type Header_collection$data = Header_collection;
export type Header_collection$key = {
    readonly " $data"?: Header_collection$data;
    readonly " $fragmentRefs": FragmentRefs<"Header_collection">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Header_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "category",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "credit",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "featuredArtistExclusionIds",
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
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "query",
      "storageKey": null,
      "args": null,
      "concreteType": "MarketingCollectionQuery",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "artistIDs",
          "args": null,
          "storageKey": null
        }
      ]
    },
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
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '0cf4acb77713799d73ee4bbb29a03fb0';
export default node;
