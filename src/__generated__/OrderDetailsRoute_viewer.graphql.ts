/**
 * @generated SignedSource<<aaa09debd975239975e4b4673c4cc9c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsRoute_viewer$data = {
  readonly me: {
    readonly order: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_order">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_me">;
  } | null | undefined;
  readonly " $fragmentType": "OrderDetailsRoute_viewer";
};
export type OrderDetailsRoute_viewer$key = {
  readonly " $data"?: OrderDetailsRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsRoute_viewer">;
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
  "name": "OrderDetailsRoute_viewer",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "OrderDetailsPage_me"
        },
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "OrderDetailsPage_order"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "1839fb9d519ab9afb2b5d958a8d69ce7";

export default node;
