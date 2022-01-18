/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SecurePayment_artwork = {
    readonly is_acquireable: boolean | null;
    readonly is_offerable: boolean | null;
    readonly " $refType": "SecurePayment_artwork";
};
export type SecurePayment_artwork$data = SecurePayment_artwork;
export type SecurePayment_artwork$key = {
    readonly " $data"?: SecurePayment_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"SecurePayment_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SecurePayment_artwork",
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
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '7b709dabe338934945be8bc6d1518082';
export default node;
