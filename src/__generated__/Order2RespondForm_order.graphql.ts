/**
 * @generated SignedSource<<99359da6d792075ff7fe9d8717c5d0ad>>
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2RespondOfferDetails_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "0e26f7624d16a78f0c17919bec42ee5e";

export default node;
