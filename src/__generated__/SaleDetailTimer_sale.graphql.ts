/**
 * @generated SignedSource<<f223c3d46e3176be935233811baeeb2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleDetailTimer_sale$data = {
  readonly endAt: string | null;
  readonly endedAt: string | null;
  readonly startAt: string | null;
  readonly " $fragmentType": "SaleDetailTimer_sale";
};
export type SaleDetailTimer_sale$key = {
  readonly " $data"?: SaleDetailTimer_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleDetailTimer_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleDetailTimer_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    },
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
      "name": "startAt",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "451836d3b35263dfccf1a6ff546ca8c0";

export default node;
