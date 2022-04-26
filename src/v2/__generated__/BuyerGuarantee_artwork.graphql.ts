/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BuyerGuarantee_artwork = {
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAcquireable",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOfferable",
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'f9de274d8ab42f89abb8f6ff744c9b06';
export default node;
