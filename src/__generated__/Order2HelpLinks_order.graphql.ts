/**
 * @generated SignedSource<<729ea8af696e0ea1473c7a7732fe66a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2HelpLinks_order$data = {
  readonly internalID: string;
  readonly mode: OrderModeEnum;
  readonly " $fragmentType": "Order2HelpLinks_order";
};
export type Order2HelpLinks_order$key = {
  readonly " $data"?: Order2HelpLinks_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2HelpLinks_order",
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
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "e3ac31d28ee3d94803d009fcb63aae39";

export default node;
