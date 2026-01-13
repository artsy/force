/**
 * @generated SignedSource<<2e7aeda47ef595f667f7a5ba343c5ff0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleMetaTags_article$data = {
  readonly byline: string | null | undefined;
  readonly description: string | null | undefined;
  readonly href: string;
  readonly keywords: ReadonlyArray<string>;
  readonly metaPublishedAt: string | null | undefined;
  readonly searchDescription: string | null | undefined;
  readonly searchTitle: string | null | undefined;
  readonly thumbnailImage: {
    readonly url: string | null | undefined;
  } | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArticleMetaTags_article";
} | null | undefined;
export type ArticleMetaTags_article$key = {
  readonly " $data"?: ArticleMetaTags_article$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleMetaTags_article">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleMetaTags_article",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "byline",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "href",
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "keywords",
      "storageKey": null
    },
    {
      "alias": "metaPublishedAt",
      "args": null,
      "kind": "ScalarField",
      "name": "publishedAt",
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
      "name": "searchTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "searchDescription",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "thumbnailImage",
      "plural": false,
      "selections": [
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

(node as any).hash = "4a07c39007d7829d967d759a7a8c2b5b";

export default node;
