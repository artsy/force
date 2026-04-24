/**
 * @generated SignedSource<<3727cef9f694e53738abfa5be00a3a2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutContext_me$data = {
  readonly addressConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2CheckoutContext_me";
};
export type Order2CheckoutContext_me$key = {
  readonly " $data"?: Order2CheckoutContext_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutContext_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutContext_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "UserAddressConnection",
      "kind": "LinkedField",
      "name": "addressConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserAddressEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "UserAddress",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "addressConnection(first:20)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "4eaad560f4495bd9000dfa01138320a8";

export default node;
