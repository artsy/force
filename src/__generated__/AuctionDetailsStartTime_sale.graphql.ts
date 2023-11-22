/**
 * @generated SignedSource<<535c2f57a08d8c41ace55084e24d5cde>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionDetailsStartTime_sale$data = {
  readonly cascadingEndTime: {
    readonly formattedStartDateTime: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "AuctionDetailsStartTime_sale";
};
export type AuctionDetailsStartTime_sale$key = {
  readonly " $data"?: AuctionDetailsStartTime_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionDetailsStartTime_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionDetailsStartTime_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleCascadingEndTime",
      "kind": "LinkedField",
      "name": "cascadingEndTime",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedStartDateTime",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "847763892d5ece0ebc4aeadf9fa47e64";

export default node;
