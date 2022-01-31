/**
 * @generated SignedSource<<7943fd6493721b72ce4ceceadbfa0da8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaticPageApp_page$data = {
  readonly name: string;
  readonly content: string | null;
  readonly " $fragmentType": "StaticPageApp_page";
};
export type StaticPageApp_page$key = {
  readonly " $data"?: StaticPageApp_page$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaticPageApp_page">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaticPageApp_page",
  "selections": [
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

(node as any).hash = "c033ab6fba82c3615fec6b8959ac232d";

export default node;
