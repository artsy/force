/**
 * @generated SignedSource<<6d76869fbaa179bc79da08c2f5eb1f12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order3App_system$data = {
  readonly time: {
    readonly day: number | null | undefined;
    readonly month: number | null | undefined;
    readonly year: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "Order3App_system";
};
export type Order3App_system$key = {
  readonly " $data"?: Order3App_system$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order3App_system">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order3App_system",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SystemTime",
      "kind": "LinkedField",
      "name": "time",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "day",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "month",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "year",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "System",
  "abstractKey": null
};

(node as any).hash = "5f3d8a802106a314d7dbd86c1a45e556";

export default node;
