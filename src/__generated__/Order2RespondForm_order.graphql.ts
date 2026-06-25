/**
 * @generated SignedSource<<5003898b8b36821d62d202a68c6ecd7f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondForm_order$data = {
  readonly buyerTotal: {
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly lastSubmittedOffer: {
    readonly buyerTotal: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly pendingOffer: {
    readonly buyerTotal: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
  } | null | undefined;
  readonly submittedOffers: ReadonlyArray<{
    readonly buyerTotal: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly internalID: string;
  }>;
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
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  (v0/*: any*/)
];
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
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "submittedOffers",
      "plural": true,
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondOfferDetails_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "009a9a3f2150ed948170e40f3fed2792";

export default node;
