/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PageApp_page = {
    readonly internalID: string;
    readonly name: string;
    readonly content: string | null;
    readonly " $refType": "PageApp_page";
};
export type PageApp_page$data = PageApp_page;
export type PageApp_page$key = {
    readonly " $data"?: PageApp_page$data;
    readonly " $fragmentRefs": FragmentRefs<"PageApp_page">;
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
(node as any).hash = '94845d296973a411f90edbe8aca444a5';
export default node;
