/**
 * @generated SignedSource<<b5c8f5ed9dcb5fe30857b6e98d0a1cca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShippingLocationRoute_submission$data = {
  readonly locationCity: string | null | undefined;
  readonly locationCountry: string | null | undefined;
  readonly locationPostalCode: string | null | undefined;
  readonly locationState: string | null | undefined;
  readonly " $fragmentType": "ShippingLocationRoute_submission";
};
export type ShippingLocationRoute_submission$key = {
  readonly " $data"?: ShippingLocationRoute_submission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShippingLocationRoute_submission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShippingLocationRoute_submission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationCity",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationCountry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationPostalCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationState",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "840c0356f8a09fa79e81c9cb6d8be256";

export default node;
