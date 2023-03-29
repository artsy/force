/**
 * @generated SignedSource<<0884100ec2b414b684b994340d6553ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderStateStatusWithCounter_order$data = {
  readonly formattedStateExpiresAt: string | null;
  readonly stateExpiresAt: string;
  readonly stateUpdatedAt: string;
  readonly " $fragmentType": "OrderStateStatusWithCounter_order";
} | null;
export type OrderStateStatusWithCounter_order$key = {
  readonly " $data"?: OrderStateStatusWithCounter_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderStateStatusWithCounter_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderStateStatusWithCounter_order",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stateExpiresAt",
        "storageKey": null
      },
      "action": "NONE",
      "path": "stateExpiresAt"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stateUpdatedAt",
        "storageKey": null
      },
      "action": "NONE",
      "path": "stateUpdatedAt"
    },
    {
      "alias": "formattedStateExpiresAt",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D, h:mm A zz"
        }
      ],
      "kind": "ScalarField",
      "name": "stateExpiresAt",
      "storageKey": "stateExpiresAt(format:\"MMM D, h:mm A zz\")"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "56553a187ed2e3a93e24d71c8bcb5fa7";

export default node;
