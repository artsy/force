/**
 * @generated SignedSource<<ff99b1b9ee0c90b707963e276e00d665>>
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

(node as any).hash = "895892f99b8fbdabde56af0264250235";

export default node;
