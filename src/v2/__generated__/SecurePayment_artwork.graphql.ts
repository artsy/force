/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SecurePayment_artwork = {
    readonly isAcquireable: boolean | null;
    readonly isOfferable: boolean | null;
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
(node as any).hash = '5e273928806f26e5c3da63debc8a1da9';
export default node;
