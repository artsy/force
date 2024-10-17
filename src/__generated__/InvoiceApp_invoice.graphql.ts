/**
 * @generated SignedSource<<6870df65d15bfe29ff90b78dcc51ea82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceApp_invoice$data = {
  readonly number: string;
  readonly readyAt: string | null | undefined;
  readonly " $fragmentType": "InvoiceApp_invoice";
};
export type InvoiceApp_invoice$key = {
  readonly " $data"?: InvoiceApp_invoice$data;
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceApp_invoice">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InvoiceApp_invoice",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "number",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D, YYYY"
        }
      ],
      "kind": "ScalarField",
      "name": "readyAt",
      "storageKey": "readyAt(format:\"MMM D, YYYY\")"
    }
  ],
  "type": "Invoice",
  "abstractKey": null
};

(node as any).hash = "ee1271afa542a1df6d58fa2d3a7edda5";

export default node;
