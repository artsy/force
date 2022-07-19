/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PollAccountBalance_commerceBankAccountBalance = {
    readonly balanceCents: number | null;
    readonly currencyCode: string | null;
    readonly " $refType": "PollAccountBalance_commerceBankAccountBalance";
};
export type PollAccountBalance_commerceBankAccountBalance$data = PollAccountBalance_commerceBankAccountBalance;
export type PollAccountBalance_commerceBankAccountBalance$key = {
    readonly " $data"?: PollAccountBalance_commerceBankAccountBalance$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PollAccountBalance_commerceBankAccountBalance">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PollAccountBalance_commerceBankAccountBalance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "balanceCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencyCode",
      "storageKey": null
    }
  ],
  "type": "CommerceBankAccountBalance",
  "abstractKey": null
};
(node as any).hash = 'b7a2606227ff11331e639422e5981bce';
export default node;
