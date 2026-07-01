/**
 * @generated SignedSource<<024e76297cc19713c356bf19c4a55c9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondForm_order$data = {
  readonly lastSubmittedOffer: {
    readonly buyerTotal: {
      readonly display: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondOfferDetails_order">;
  readonly " $fragmentType": "Order2RespondForm_order";
};
export type Order2RespondForm_order$key = {
  readonly " $data"?: Order2RespondForm_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2RespondForm_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2RespondForm_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Offer",
      "kind": "LinkedField",
      "name": "lastSubmittedOffer",
      "plural": false,
      "selections": [
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

(node as any).hash = "baf10b0930731caa607919a68078833e";

export default node;
