/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2Meta_sale = {
    readonly name: string | null;
    readonly description: string | null;
    readonly slug: string;
    readonly " $refType": "Auction2Meta_sale";
};
export type Auction2Meta_sale$data = Auction2Meta_sale;
export type Auction2Meta_sale$key = {
    readonly " $data"?: Auction2Meta_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2Meta_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2Meta_sale",
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
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale"
};
(node as any).hash = '709edfb2739abd0f0aacd9da6d8a44af';
export default node;
