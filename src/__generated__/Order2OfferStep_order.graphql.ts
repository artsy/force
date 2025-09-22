/**
 * @generated SignedSource<<ae49e8722064ed7883bbd851cd5e193b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type OrderModeEnum = "BUY" | "OFFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Order2OfferStep_order$data = {
  readonly currencyCode: string;
  readonly internalID: string;
  readonly lineItems: ReadonlyArray<{
    readonly artwork: {
      readonly editionSets: ReadonlyArray<{
        readonly internalID: string;
      } | null | undefined> | null | undefined;
      readonly slug: string;
    } | null | undefined;
  } | null | undefined>;
  readonly mode: OrderModeEnum;
  readonly " $fragmentSpreads": FragmentRefs<"Order2ExactPriceOfferForm_order" | "Order2OfferCompletedView_order">;
  readonly " $fragmentType": "Order2OfferStep_order";
};
export type Order2OfferStep_order$key = {
  readonly " $data"?: Order2OfferStep_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2OfferStep_order">;
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
  "name": "Order2OfferStep_order",
  "selections": [
    (v0/*: any*/),
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
      "name": "currencyCode",
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
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "EditionSet",
              "kind": "LinkedField",
              "name": "editionSets",
              "plural": true,
              "selections": [
                (v0/*: any*/)
              ],
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
      "name": "Order2ExactPriceOfferForm_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Order2OfferCompletedView_order"
    }
  ],
  "type": "Order",
  "abstractKey": null
};
})();

(node as any).hash = "c5c3c58a51e82947dffde7251bb82c84";

export default node;
