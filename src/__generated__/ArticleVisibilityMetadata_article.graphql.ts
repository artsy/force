/**
 * @generated SignedSource<<b87a29597dfa90a1433e8f54f3e8b58a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleVisibilityMetadata_article$data = {
  readonly title: string | null;
  readonly searchTitle: string | null;
  readonly href: string | null;
  readonly " $fragmentType": "ArticleVisibilityMetadata_article";
};
export type ArticleVisibilityMetadata_article$key = {
  readonly " $data"?: ArticleVisibilityMetadata_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleVisibilityMetadata_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleVisibilityMetadata_article",
  "selections": [
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
      "name": "searchTitle",
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
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "0540aa3c8586f0eb1bcf34d79f2fe8df";

export default node;
