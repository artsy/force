/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionEntity_collection = {
    readonly slug: string;
    readonly headerImage: string | null;
    readonly title: string;
    readonly price_guidance: number | null;
    readonly show_on_editorial: boolean;
    readonly " $refType": "CollectionEntity_collection";
};
export type CollectionEntity_collection$data = CollectionEntity_collection;
export type CollectionEntity_collection$key = {
    readonly " $data"?: CollectionEntity_collection$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectionEntity_collection">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "CollectionEntity_collection",
  "type": "MarketingCollection",
  "metadata": null,
  "argumentDefinitions": [],
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
    },
    {
      "kind": "ScalarField",
      "alias": "price_guidance",
      "name": "priceGuidance",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "show_on_editorial",
      "name": "showOnEditorial",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '7b6be8924b3cafab86730578ebf5c997';
export default node;
