/**
 * @generated SignedSource<<5ef49e13b30a247ec5ab98546e7d22b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_order$data = {
  readonly internalID: string;
  readonly myLastOffer?: {
    readonly amountCents: number;
  } | null | undefined;
  readonly " $fragmentType": "PriceOptions_order";
};
export type PriceOptions_order$key = {
  readonly " $data"?: PriceOptions_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceOptions_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceOptions_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "amountCents",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "42eab762247c84117e227b168dda8d63";

export default node;
