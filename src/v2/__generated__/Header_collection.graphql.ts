/* tslint:disable */
/* eslint-disable */

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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Header_collection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "credit",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "featuredArtistExclusionIds",
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
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MarketingCollectionQuery",
      "kind": "LinkedField",
      "name": "query",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artistIDs",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
    }
  ],
  "type": "MarketingCollection"
};
(node as any).hash = '0cf4acb77713799d73ee4bbb29a03fb0';
export default node;
