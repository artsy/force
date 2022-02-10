/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_artwork = {
    readonly priceCurrency: string | null;
    readonly isPriceRange: boolean | null;
    readonly " $refType": "PriceOptions_artwork";
};
export type PriceOptions_artwork$data = PriceOptions_artwork;
export type PriceOptions_artwork$key = {
    readonly " $data"?: PriceOptions_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"PriceOptions_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceOptions_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "priceCurrency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPriceRange",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '63321966e23331f39192bd5164f3956b';
export default node;
