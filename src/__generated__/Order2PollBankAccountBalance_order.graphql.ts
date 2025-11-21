/**
 * @generated SignedSource<<cacddc95214824c40831de0fe0746d92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type BankAccountBalanceCheckResult = "INSUFFICIENT" | "INVALID" | "NOT_SUPPORTED" | "PENDING" | "SUFFICIENT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2PollBankAccountBalance_order$data = {
  readonly bankAccountBalanceCheck: {
    readonly message: string | null | undefined;
    readonly result: BankAccountBalanceCheckResult;
  } | null | undefined;
  readonly internalID: string;
  readonly " $fragmentType": "Order2PollBankAccountBalance_order";
};
export type Order2PollBankAccountBalance_order$key = {
  readonly " $data"?: Order2PollBankAccountBalance_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2PollBankAccountBalance_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2PollBankAccountBalance_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "BankAccountBalanceCheck",
      "kind": "LinkedField",
      "name": "bankAccountBalanceCheck",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "result",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "e0935c819d96e1e753a87977a73b2382";

export default node;
