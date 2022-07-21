/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArticlesApp_viewer = {
    readonly " $fragmentRefs": FragmentRefs<"ArticlesIndexArticles_viewer">;
    readonly " $refType": "ArticlesApp_viewer";
};
export type ArticlesApp_viewer$data = ArticlesApp_viewer;
export type ArticlesApp_viewer$key = {
    readonly " $data"?: ArticlesApp_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArticlesApp_viewer">;
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
(node as any).hash = '17f39e1201099c7627271106edd9a319';
export default node;
