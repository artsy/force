/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionMeta_sale = {
    readonly name: string | null;
    readonly description: string | null;
    readonly slug: string;
    readonly " $refType": "AuctionMeta_sale";
};
export type AuctionMeta_sale$data = AuctionMeta_sale;
export type AuctionMeta_sale$key = {
    readonly " $data"?: AuctionMeta_sale$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuctionMeta_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionMeta_sale",
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
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "description",
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = 'b9dd3b2b515e4f8724cf1940da45a6bf';
export default node;
