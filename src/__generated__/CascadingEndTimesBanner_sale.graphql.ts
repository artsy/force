/**
 * @generated SignedSource<<fe6ff72b50891d4efac76aadc8b9ee29>>
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
  readonly endedAt: string | null | undefined;
  readonly extendedBiddingIntervalMinutes: number | null | undefined;
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
      "name": "endedAt",
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

(node as any).hash = "c5097f53fb85b79dd8b5b18def9dc7ad";

export default node;
