/**
 * @generated SignedSource<<09aa98201f68a179364bc55105662a73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SecurePayment_artwork$data = {
  readonly is_acquireable: boolean | null | undefined;
  readonly is_offerable: boolean | null | undefined;
  readonly " $fragmentType": "SecurePayment_artwork";
};
export type SecurePayment_artwork$key = {
  readonly " $data"?: SecurePayment_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"SecurePayment_artwork">;
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

(node as any).hash = "7b709dabe338934945be8bc6d1518082";

export default node;
