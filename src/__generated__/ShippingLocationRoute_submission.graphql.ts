/**
 * @generated SignedSource<<51abae73529c19255d3f20771eb40d3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShippingLocationRoute_submission$data = {
  readonly locationAddress: string | null | undefined;
  readonly locationAddress2: string | null | undefined;
  readonly locationCity: string | null | undefined;
  readonly locationCountry: string | null | undefined;
  readonly locationCountryCode: string | null | undefined;
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
      "name": "locationCountryCode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationState",
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
      "name": "locationAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationAddress2",
      "storageKey": null
    }
  ],
  "type": "ConsignmentSubmission",
  "abstractKey": null
};

(node as any).hash = "69d2d9d81886a88766324025aaeb368b";

export default node;
