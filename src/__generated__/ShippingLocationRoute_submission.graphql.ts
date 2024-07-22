/**
 * @generated SignedSource<<15ce1ddc6960d5e5f621c24e523f45d2>>
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

(node as any).hash = "202a345dfc3053e8e7682af670cb2331";

export default node;
