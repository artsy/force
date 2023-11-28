/**
 * @generated SignedSource<<54124edc09ff72f62f1a4ce2e2ee99c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmittedOrderModal_submittedOrder$data = {
  readonly stateExpiresAt: string | null | undefined;
  readonly " $fragmentType": "SubmittedOrderModal_submittedOrder";
};
export type SubmittedOrderModal_submittedOrder$key = {
  readonly " $data"?: SubmittedOrderModal_submittedOrder$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmittedOrderModal_submittedOrder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmittedOrderModal_submittedOrder",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D"
        }
      ],
      "kind": "ScalarField",
      "name": "stateExpiresAt",
      "storageKey": "stateExpiresAt(format:\"MMM D\")"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "5bedd1fb7819d00faa9db23ee7653eb2";

export default node;
