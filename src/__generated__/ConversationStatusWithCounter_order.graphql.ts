/**
 * @generated SignedSource<<af60512d574400419df39d9bf4e86cb7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationStatusWithCounter_order$data = {
  readonly formattedStateExpiresAt: string | null | undefined;
  readonly stateExpiresAt: string;
  readonly stateUpdatedAt: string;
  readonly " $fragmentType": "ConversationStatusWithCounter_order";
} | null | undefined;
export type ConversationStatusWithCounter_order$key = {
  readonly " $data"?: ConversationStatusWithCounter_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationStatusWithCounter_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationStatusWithCounter_order",
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

(node as any).hash = "44238dc969213f2c55d2b51279bbf736";

export default node;
