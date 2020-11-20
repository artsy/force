/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuarantee_artwork = {
    readonly is_acquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly " $refType": "BuyerGuarantee_artwork";
};
export type BuyerGuarantee_artwork$data = BuyerGuarantee_artwork;
export type BuyerGuarantee_artwork$key = {
    readonly " $data"?: BuyerGuarantee_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"BuyerGuarantee_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyerGuarantee_artwork",
  "selections": [
    {
      "alias": "is_acquireable",
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": "is_offerable",
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '06087f71d5e148df2d9230940ba042ec';
export default node;
