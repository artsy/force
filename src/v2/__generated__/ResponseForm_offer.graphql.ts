/**
 * @generated SignedSource<<fe9170a6403b876b25f7cc4b58f7a612>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ResponseForm_offer$data = {
  readonly id: string;
  readonly " $fragmentType": "ResponseForm_offer";
};
export type ResponseForm_offer$key = {
  readonly " $data"?: ResponseForm_offer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResponseForm_offer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResponseForm_offer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ConsignmentOffer",
  "abstractKey": null
};

(node as any).hash = "fb724895fbbee96b863701cb60123d7b";

export default node;
