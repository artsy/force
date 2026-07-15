/**
 * @generated SignedSource<<2dd61094dcc823b5e0d42da8d76ac4d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondSummary_order$data = {
  readonly internalID: string;
  readonly lastSubmittedOffer: {
    readonly internalID: string;
  } | null | undefined;
  readonly lineItems: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"useLineItemData_lineItem">;
  } | null | undefined>;
  readonly pendingOffer: {
    readonly internalID: string;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OrderSummary_order">;
  readonly " $fragmentType": "Order2RespondSummary_order";
};
export type Order2RespondSummary_order$key = {
  readonly " $data"?: Order2RespondSummary_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondSummary_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondSummary_order",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2OrderSummary_order"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "lastSubmittedOffer",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "LineItem",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useLineItemData_lineItem"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "5deb4434bccd6e7d479953ba26faaf43";

export default node;
