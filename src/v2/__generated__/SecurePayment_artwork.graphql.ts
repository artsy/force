/* tslint:disable */

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
  "kind": "Fragment",
  "name": "SecurePayment_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": "is_acquireable",
      "name": "isAcquireable",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_offerable",
      "name": "isOfferable",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '7b709dabe338934945be8bc6d1518082';
export default node;
