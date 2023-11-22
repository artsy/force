/**
 * @generated SignedSource<<4b7e2ab26517c6e5d7a34bc521c01a7a>>
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

(node as any).hash = "1821c972be80a5587319bdcf90723bba";

export default node;
