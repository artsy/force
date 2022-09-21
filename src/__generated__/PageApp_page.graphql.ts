/**
 * @generated SignedSource<<524547d9cd278fec890ae58456580dc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PageApp_page$data = {
  readonly internalID: string;
  readonly name: string;
  readonly content: string | null;
  readonly " $fragmentType": "PageApp_page";
};
export type PageApp_page$key = {
  readonly " $data"?: PageApp_page$data;
  readonly " $fragmentSpreads": FragmentRefs<"PageApp_page">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PageApp_page",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "kind": "ScalarField",
      "name": "content",
      "storageKey": "content(format:\"HTML\")"
    }
  ],
  "type": "Page",
  "abstractKey": null
};

(node as any).hash = "94845d296973a411f90edbe8aca444a5";

export default node;
