/**
 * @generated SignedSource<<36a5c2c8fb6d0697cb189cd209d0c733>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExampleApp_system$data = {
  readonly time: {
    readonly day: number | null | undefined;
    readonly month: number | null | undefined;
    readonly year: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ExampleApp_system";
};
export type ExampleApp_system$key = {
  readonly " $data"?: ExampleApp_system$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExampleApp_system">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExampleApp_system",
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

(node as any).hash = "3d5a7bab53c323bad0ea9bbd204b174f";

export default node;
