/**
 * @generated SignedSource<<10eddc5b418fd8bb515f01515e76cdbe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PressApp_page$data = {
  readonly internalID: string;
  readonly name: string;
  readonly content: string | null;
  readonly " $fragmentType": "PressApp_page";
};
export type PressApp_page$key = {
  readonly " $data"?: PressApp_page$data;
  readonly " $fragmentSpreads": FragmentRefs<"PressApp_page">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PressApp_page",
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

(node as any).hash = "a889683a5e7ce6942841f8852f8c6bd5";

export default node;
