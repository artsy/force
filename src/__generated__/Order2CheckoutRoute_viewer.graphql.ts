/**
 * @generated SignedSource<<f3d9e5283276c3ba17cb11780f4d78e5>>
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
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutApp_order" | "Order2CheckoutContext_order">;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2CheckoutRoute_viewer";
};
export type Order2CheckoutRoute_viewer$key = {
  readonly " $data"?: Order2CheckoutRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_viewer">;
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
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2CheckoutContext_order"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2CheckoutApp_order"
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
                    (v0/*: any*/)
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
})();

(node as any).hash = "1dda868a9fdd9664177e9210db608447";

export default node;
