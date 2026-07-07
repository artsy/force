/**
 * @generated SignedSource<<e844cd25078af3dbbb6480ffb62d95b7>>
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
    readonly buyerTotal: {
      readonly display: string | null | undefined;
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
          "name": "buyerTotal",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "display",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "major",
              "storageKey": null
            }
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

(node as any).hash = "b1db3f7a1dfb721220fbbcffbcd9d457";

export default node;
