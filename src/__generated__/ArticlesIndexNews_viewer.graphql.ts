/**
 * @generated SignedSource<<53dfb74e3a727455adf7137cce92276e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticlesIndexNews_viewer$data = {
  readonly articles: ReadonlyArray<{
    readonly href: string | null;
    readonly internalID: string;
    readonly title: string | null;
  }>;
  readonly " $fragmentType": "ArticlesIndexNews_viewer";
};
export type ArticlesIndexNews_viewer$key = {
  readonly " $data"?: ArticlesIndexNews_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticlesIndexNews_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticlesIndexNews_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "layout",
          "value": "NEWS"
        },
        {
          "kind": "Literal",
          "name": "limit",
          "value": 3
        },
        {
          "kind": "Literal",
          "name": "published",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "PUBLISHED_AT_DESC"
        }
      ],
      "concreteType": "Article",
      "kind": "LinkedField",
      "name": "articles",
      "plural": true,
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
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        }
      ],
      "storageKey": "articles(layout:\"NEWS\",limit:3,published:true,sort:\"PUBLISHED_AT_DESC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "822ba23e4531800309d371ebde7d0d21";

export default node;
