/**
 * @generated SignedSource<<c7ff57b3d633acc2d9e3e3f84e414f29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticlesApp_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArticlesIndexArticles_viewer" | "ArticlesIndexNews_viewer">;
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
      "name": "ArticlesIndexNews_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticlesIndexArticles_viewer"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "e90c5b665eb010cc1ad4e60ecd4bac26";

export default node;
