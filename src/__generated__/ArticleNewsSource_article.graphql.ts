/**
 * @generated SignedSource<<ac5da5d670ff9975041ffb7a2092fefd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleNewsSource_article$data = {
  readonly newsSource: {
    readonly title: string | null;
    readonly url: string | null;
  } | null;
  readonly " $fragmentType": "ArticleNewsSource_article";
};
export type ArticleNewsSource_article$key = {
  readonly " $data"?: ArticleNewsSource_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleNewsSource_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleNewsSource_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArticleNewsSource",
      "kind": "LinkedField",
      "name": "newsSource",
      "plural": false,
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
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Article",
  "abstractKey": null
};

(node as any).hash = "9042f6f63d1824652ae3a9e007165c59";

export default node;
