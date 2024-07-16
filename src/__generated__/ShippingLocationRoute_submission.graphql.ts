/**
 * @generated SignedSource<<ba26be2a4ca3bec6959d4cae7ebfeb60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShippingLocationRoute_submission$data = {
  readonly locationAddress: string | null | undefined;
  readonly locationAddress2: string | null | undefined;
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
      "name": "locationAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locationAddress2",
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

(node as any).hash = "14fe618e5327fc7ba3dcdccfc8d2233f";

export default node;
