/**
 * @generated SignedSource<<52eab5caccb1e2e4d26141a05689e529>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsRoute_viewer$data = {
  readonly me: {
    readonly order: {
      readonly internalID: string;
      readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsPage_order">;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order2DetailsRoute_viewer";
};
export type Order2DetailsRoute_viewer$key = {
  readonly " $data"?: Order2DetailsRoute_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsRoute_viewer">;
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
  "name": "Order2DetailsRoute_viewer",
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
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Order2DetailsPage_order"
            },
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
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "bf419309f435f0f8c96a9ba9be088cf3";

export default node;
