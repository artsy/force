/**
 * @generated SignedSource<<47a3c930d2ad4868596ce6b4e8a68f7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticlesApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArticlesIndexArticles_viewer">;
  readonly " $fragmentType": "ArticlesApp_viewer";
};
export type ArticlesApp_viewer$key = {
  readonly " $data"?: ArticlesApp_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticlesApp_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticlesApp_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticlesIndexArticles_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "17f39e1201099c7627271106edd9a319";

export default node;
