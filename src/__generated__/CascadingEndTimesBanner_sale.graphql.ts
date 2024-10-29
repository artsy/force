/**
 * @generated SignedSource<<8db41ca3d65b736c5dc033ade04b1b04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CascadingEndTimesBanner_sale$data = {
  readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
  readonly extendedBiddingIntervalMinutes: number | null | undefined;
  readonly isClosed: boolean | null | undefined;
  readonly " $fragmentType": "CascadingEndTimesBanner_sale";
};
export type CascadingEndTimesBanner_sale$key = {
  readonly " $data"?: CascadingEndTimesBanner_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CascadingEndTimesBanner_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isClosed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cascadingEndTimeIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingIntervalMinutes",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "573175b841adb8cfdf9fc6a3ef0afaf8";

export default node;
