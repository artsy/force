/**
 * @generated SignedSource<<dcfcb94b23e54c1b5b8ee13de4f16d66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondForm_order$data = {
  readonly internalID: string;
  readonly lastSubmittedOffer: {
    readonly amount: {
      readonly amount: string | null | undefined;
      readonly currencyCode: string;
      readonly currencySymbol: string | null | undefined;
      readonly major: number;
    } | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly pendingOffer: {
    readonly amount: {
      readonly major: number;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondOfferDetails_order">;
  readonly " $fragmentType": "Order2RespondForm_order";
};
export type Order2RespondForm_order$key = {
  readonly " $data"?: Order2RespondForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondForm_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondForm_order",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "lastSubmittedOffer",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "currencyCode",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "currencySymbol",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "amount",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "pendingOffer",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": [
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondOfferDetails_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "10d0b470dddc037220b75913f664fb2f";

export default node;
