/**
 * @generated SignedSource<<ed913dbaed4edec0fc9c2320cb5eb0c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type OrderSourceEnum = "ARTWORK_PAGE" | "INQUIRY" | "PARTNER_OFFER" | "PRIVATE_SALE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2HelpLinks_order$data = {
  readonly internalID: string;
  readonly mode: OrderModeEnum;
  readonly source: OrderSourceEnum;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "4d2bec71dc368fe2b79db6de1102ec42";

export default node;
