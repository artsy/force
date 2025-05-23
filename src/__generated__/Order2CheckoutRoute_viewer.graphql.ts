/**
 * @generated SignedSource<<f05150165f9222e4cbc577bbfcdfd4a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutRoute_viewer$data = {
  readonly me: {
    readonly addressConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutContext_order">;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_viewer">;
  readonly " $fragmentType": "Order2CheckoutRoute_viewer";
};
export type Order2CheckoutRoute_viewer$key = {
  readonly " $data"?: Order2CheckoutRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "orderID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2CheckoutRoute_viewer",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "orderID",
          "variableName": "orderID"
        }
      ],
      "kind": "FragmentSpread",
      "name": "Order2CheckoutApp_viewer"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Me",
      "kind": "LinkedField",
      "name": "me",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "id",
              "variableName": "orderID"
            }
          ],
          "concreteType": "Order",
          "kind": "LinkedField",
          "name": "order",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2CheckoutContext_order"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 10
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
          "storageKey": "addressConnection(first:10)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "b0195e8c31bd09de4ae6049ba9ef8a54";

export default node;
